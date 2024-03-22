import {useState, useCallback, useEffect} from "react"
import Portlet from "./components/portlet";
import Encabezado from "./components/encabezado";
import Selectable from "./components/selectable";
import Appendable from "./components/appendable";
import { useCajas, useSaldos, useGastos, useIngresos, useProyectos } from "@/utility/hooks";
import { saldosActions } from '@/redux/actions/saldos';
import { movimientosActions } from '@/redux/actions/movimientos';
import { comprobantesActions } from '@/redux/actions/comprobantes';
import { useDispatch } from "react-redux";
import Spinner from "@/components/spinner";
import moment from "moment";
import CHOICES from "./components/choices";
import { Service } from "@/redux/services/general";


export default function Comprobante({ moduleHandler, destinatario, comprobanteId, onClose }) {

    const dispatch = useDispatch();

    const [comprobante, setComprobante] = useState({
        id: null,
        fecha_operacion: moment().format('YYYY-MM-DD'),
        destinatario: destinatario.id,
        modulo: moduleHandler,
        descripcion: '',
        link: '',
        receipt: {
            receipt_type: "",
            point_of_sales: '',
            issued_date: moment().format('YYYY-MM-DD'),
            receipt_number: '',
            currency: 'PES',
            currency_quote: 1
        },
        cargas: [],
        cobros: [],
        descargas: [],
    });

    const [onlyRead, setOnlyRead] = useState();
    const [ingresos, loadingIngresos] = useIngresos();
    const [proyectos, loadingProyectos] = useProyectos();
    const [gastos, loadingGastos] = useGastos();
    const [cajas, loadingCajas] = useCajas();
    const [saldos, loadingSaldos] = useSaldos(destinatario);
    const [canSend, setCanSend] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tipoComprobante, setTipoComprobante] = useState({})
    const [errors, setErrors] = useState({})



    useEffect(() => {
        
        if (comprobanteId) {
            setLoading(true);
    
            dispatch(comprobantesActions.get(comprobanteId))
            .then((doc) => {
                setComprobante(doc)
                if (doc.afip || doc.modulo !== moduleHandler) setOnlyRead(true)
                const newTipo = CHOICES.receiptTypes[doc.modulo].find(t => t.value === doc.receipt.receipt_type)
                setTipoComprobante(newTipo)                

            })
            .finally(() => setLoading(false));
          }
    
    }, []);

    useEffect(()=> {
        if (!comprobante.id) {
            setComprobante(doc => ({
                ...doc, 
                receipt: {
                    ...doc.receipt, 
                    point_of_sales: '', 
                    receipt_number: ''
                },
            }))
            const newTipo = CHOICES.receiptTypes[comprobante.modulo].find(t => t.value === comprobante.receipt.receipt_type)
            setTipoComprobante(newTipo)
        }
    }, [comprobante.receipt.receipt_type])


    const validate = () => {
        if (comprobante.receipt.receipt_type === '') return false
        if (comprobante.receipt.point_of_sales === '') return false
        if (comprobante.receipt.receipt_type !== '') {
            if(tipoComprobante && tipoComprobante.receipt_number === "manual" && comprobante.receipt.receipt_number === "") 
            return false
        }

        const totalCargas = comprobante.cargas ? comprobante.cargas.filter(c => (c.concepto !== 0 && Number(c.total_pesos) > 0)).reduce((total, current) => total + Number(current['total_pesos']), 0) : 0
        const totalCobros = comprobante.cobros ? comprobante.cobros.reduce((total, current) => total + Number(current['total_pesos']), 0) : 0
        const totalDescargas = comprobante.descargas ? comprobante.descargas.filter(c => (c.cuenta !== 0 && Number(c.total_pesos) > 0)).reduce((total, current) => total + Number(current['total_pesos']), 0) : 0
        const totalDeudas = totalCargas + totalCobros

        // Si se crean cargas o si se intenta pagar cobros y existen descargas
        // las descargas deben ser IGUAL a la suma de cobros y cargas
        if (totalDeudas>0 && totalDescargas>0) return totalDescargas === totalDeudas
        
        if (totalDeudas < 0) return false// Significa que SOLAMENTE HAY SALDOS A FAVOR. No pase
        if (totalCobros > 0) return false // Significa que SOLAMENTE HAY COBROS. No pase
        return totalCargas > 0 // Significa que SOLAMENTE HAY CARGAS. Pase pase

    }


    useEffect(() => {
        setCanSend(validate(comprobante))
    }, [comprobante])
    
    const updateSituation = useCallback(() => {
        dispatch(saldosActions.get({ destinatario: destinatario.id, fecha: moment().format('YYYY-MM-DD'), save:true }));
        dispatch(movimientosActions.get({ destinatario: destinatario.id, fecha: moment().format('YYYY-MM-DD'), save:true, page: 1 }));
    }, [dispatch, destinatario] );

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        setLoading(true);
        
        
        const payload = {
            ...comprobante,
            cargas: comprobante.cargas.filter(c => (Number(c.monto) > 0)),
            cobros: comprobante.cobros.filter(c => (Number(c.monto) !== 0)),
            descargas: comprobante.descargas.filter(c => (Number(c.monto) > 0)),
        }

        dispatch(comprobantesActions.send(payload))
            .then(() => {
                updateSituation();      
            })
            .catch((error) => {
                const { data } = error;
                setErrors(data);
            })
            .finally(() => {
                setLoading(false)
                if (onClose) onClose()
            })        
    },[comprobante]);


    const showPDF = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await Service.get(`operative/comprobantes/${comprobanteId}/?pdf=1`, 'blob')
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            setLoading(false)
            window.open(url);
        } catch (error) {
          console.error('Error al abrir la ventana:', error);
        }
      };

    if (loading) return <Spinner />

    return (
        <form onSubmit={handleSubmit} name="form_cbte" method="POST">
            <Encabezado 
                comprobante={comprobante} 
                tipoComprobante={tipoComprobante}
                setComprobante={setComprobante} 
                onlyRead={onlyRead}
            />

            {/* Seccion de Cargas */}
            {comprobante.receipt.receipt_type && !comprobante.receipt.receipt_type.includes("Nota de Credito") && ((loadingIngresos || loadingCajas || loadingGastos) ? <Spinner /> : <Appendable 
                comprobante={comprobante} 
                setComprobante={setComprobante} 
                onlyRead={onlyRead}
                title={{
                    cliente: "Creditos",
                    proveedor: "Deudas",
                    caja: "Cargar dinero"
                }[comprobante.modulo]}
                handler="cargas"
                fields={[           
                    {
                    type: 'select',
                    name: 'concepto',
                    label: comprobante.modulo === "caja" ? "Desde": 'Concepto',
                    choices: [...ingresos, ...cajas, ...gastos]
                    },
                    {
                    type: 'select',
                    name: 'proyecto',
                    label: 'Proyecto',
                    choices: proyectos
                    },
                    {
                    type: 'text',
                    name: 'detalle',
                    label: 'Detalle',
                    },                                            
                    {
                    type: 'number',
                    name: 'cantidad',
                    label: 'Cantidad',
                    },
                    {
                    type: 'number',
                    name: 'monto',
                    label: 'Monto',
                    },
                    {
                    type: comprobante.receipt.currency === "PES" ? "hidden": 'number',
                    name: 'total_pesos',
                    label: 'Total ($ARS)',
                    },
                ]}
                cleanedField={{
                    concepto: '',
                    proyecto: '',
                    cantidad: 1,
                    detalle: '',
                    monto: null,
                }}
            />)
            }

            {/* Clientes: Seccion de Cobros */}
            {comprobante.receipt.receipt_type && (['cliente', 'proveedor'].includes(comprobante.modulo) || onlyRead) && (loadingSaldos ? <Spinner /> : <Selectable 
                comprobante={comprobante} 
                setComprobante={setComprobante} 
                onlyRead={onlyRead}
                color='bg-light'
                title="Saldos adeudados anteriormente"
                handler="cobros"
                rows={comprobante.id ? comprobante.cobros: saldos}
            />)
            }

            {/* Seccion de Descargas */}
            {comprobante.receipt.receipt_type && (['cliente', 'proveedor'].includes(comprobante.modulo) || onlyRead) && (loadingCajas ? <Spinner /> : <Appendable 
                comprobante={comprobante} 
                setComprobante={setComprobante} 
                onlyRead={onlyRead}
                title={{
                    cliente: "Formas de cobro",
                    proveedor: "Formas de pago",
                }[comprobante.modulo]}
                handler="descargas"
                fields={[
                    {
                    type: 'select',
                    name: 'cuenta',
                    label: 'Cuenta',
                    choices: comprobante.receipt.receipt_type.includes("Nota de Credito") ? [...ingresos, ...gastos] : cajas
                    },
                    {
                    type: 'text',
                    name: 'detalle',
                    label: 'Detalle',
                    },                 
                    {
                    type: 'date',
                    name: 'fecha_vencimiento',
                    label: 'Vencimiento',
                    },          
                    {
                    type: 'number',
                    name: 'monto',
                    label: 'Monto',
                    },
                    {
                    type: comprobante.receipt.currency === "PES" ? "hidden": 'number',
                    name: 'total_pesos',
                    label: 'Total ($ARS)',
                    },                    
                ]}
                cleanedField={{
                    cuenta: '',
                    detalle: '',
                    fecha_vencimiento: moment().format('YYYY-MM-DD'),
                    monto: 0,
                }}
            />)
            }

                
            {comprobante.receipt.receipt_type && comprobante.fecha_operacion && <Portlet 
                title="Observaciones"
                handler="descripcion">
                <div className="row">
                    <div className="col-md-12">
                    
                    <textarea 
                        type="text" 
                        id='descripcion' 
                        name="descripcion" 
                        disabled={onlyRead}
                        className="form-control" 
                        placeholder="Agregá un descripción"
                        value={comprobante.descripcion || ''}
                        onChange={(e) => setComprobante({...comprobante, descripcion: e.target.value})}
                    />
                    </div>            
                </div>
                
                {tipoComprobante && tipoComprobante.receipt_number === "manual" && <div className="row my-3">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text rounded-end-0" id="basic-addon1"><i className="bi-link-45deg" /></span>
                    </div>
                    <input 
                        type="text" 
                        id="link" 
                        name="link" 
                        className="form-control" 
                        placeholder="Agregá un link" 
                        value={comprobante.link || ''}
                        onChange={(e) => setComprobante({...comprobante, link: e.target.value})}
                    />
                    </div>
                </div>}
            </Portlet>}

            <div className="panel-footer mt-3">
                <div className="row">
                    <div className="col-sm-6">
                        <a onClick={onClose} className="btn btn-outline-danger btn-block">Cancelar</a>
                    </div>
                    <div className="col-sm-6 text-end">
                    {comprobante.pdf && <button onClick={showPDF} target="_blank" className="btn btn-bordered btn-warning btn-block mx-1">Imprimir</button>}
                    {comprobante.link && <a href={comprobante.link} target="_blank" className="btn btn-bordered btn-warning btn-block mx-1">Ver</a>}
                    {!onlyRead && <button disabled={!canSend} onClick={handleSubmit} type="submit" className="btn btn-bordered btn-primary btn-block mx-1">Guardar</button>}
                    </div>
                </div>
            </div>
        </form>
    );
};
