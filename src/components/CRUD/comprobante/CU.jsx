import {useState, useCallback, useEffect} from "react"
import Portlet from "./components/portlet";
import Encabezado from "./components/encabezado";
import Selectable from "./components/selectable";
import Appendable from "./components/appendable";
import { useCajas, useDeudas, useGastos, useIngresos } from "@/utility/hooks";
import { deudasActions } from '@/redux/actions/deudas';
import { cuentasActions } from '@/redux/actions/cuentas';
import { comprobantesActions } from '@/redux/actions/comprobantes';
import { useDispatch } from "react-redux";
import Spinner from "@/components/spinner";
import moment from "moment";
import CHOICES from "./components/choices";


export default function Comprobante({ moduleHandler, destinatario, documentoId, onlyRead, onClose }) {

    const dispatch = useDispatch();
    const [ingresos, loadingIngresos] = useIngresos();
    const [cajas, loadingCajas] = useCajas();
    const [gastos, loadingGastos] = useGastos();
    const [deudas, loadingDeudas] = useDeudas(destinatario);
    const [canSend, setCanSend] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [documento, setDocumento] = useState({
        id: null,
        fecha_operacion: moment().format('YYYY-MM-DD'),
        destinatario: destinatario.id,
        descripcion: '',
        receipt: {
            receipt_type: "",
            point_of_sales: '',
            issued_date: moment().format('YYYY-MM-DD'),
            receipt_number: '',
        },
        cargas: [],
        cobros: [],
        cajas: [],
        resultados: [],
    });

    useEffect(() => {
        
        if (documentoId) {
            setLoading(true);
    
            dispatch(comprobantesActions.get(moduleHandler, documentoId))
            .then((doc) => setDocumento(doc))
            .finally(() => setLoading(false));
          }
    
    }, []);
    
    useEffect(() => {
        
        if (documento.receipt.receipt_type.includes("Nota de Credito")) {
            setDocumento(documento => ({
                    ...documento,
                    cajas: []
                }));
        } else {
            setDocumento(documento => ({
                ...documento,
                resultados: []
            }));
        }
    
    }, [documento.receipt.receipt_type]);     

    const validate = () => {
        if (documento.receipt.receipt_type === '') return false
        if (documento.receipt.point_of_sales === '') return false
        if (documento.receipt.receipt_type !== '') {
            if(CHOICES.receiptTypes[moduleHandler].find(t => t.value === documento.receipt.receipt_type).receipt_number === "manual" && documento.receipt.receipt_number === "") 
            return false
        }

        const totalCargas = documento.cargas ? documento.cargas.filter(c => (c.concepto !== "" || Number(c.monto) > 0)).reduce((total, current) => total + Number(current['monto']), 0) : 0
        const totalCobros = documento.cobros ? documento.cobros.reduce((total, current) => total + Number(current['monto']), 0) : 0
        const totalCajas = documento.cajas ? documento.cajas.reduce((total, current) => total + Number(current['monto']), 0) : 0
        const totalResultados = documento.resultados ? documento.resultados.filter(r => r.cuenta !== "").reduce((total, current) => total + Number(current['monto']), 0) : 0
        const totalDeudas = totalCargas + totalCobros
        
        // Si es nota de credito el valor de los resultados debe ser IGUAL a la suma de cobros y cargas
        if (totalResultados > 0) return totalResultados === totalDeudas
        
        // Si se crean cargas o si se intenta pagar cobros y existen cajas
        // las cajas deben ser IGUAL a la suma de cobros y cargas
        if (totalDeudas>0 && totalCajas>0) return totalCajas === totalDeudas
        
        if (totalDeudas < 0) return false// Significa que SOLAMENTE HAY SALDOS A FAVOR. No pase
        if (totalCajas > 0) return false // Significa que SOLAMENTE HAY CAJAS. Pase pase
        if (totalCobros > 0) return false // Significa que SOLAMENTE HAY COBROS. No pase
        return totalCargas > 0 // Significa que SOLAMENTE HAY CARGAS. Pase pase

    }


    useEffect(() => {
        setCanSend(validate(documento))
    }, [documento])
    
    const updateSituation = useCallback(() => {
        dispatch(deudasActions.get({ destinatario: destinatario.id, fecha: moment().format('YYYY-MM-DD'), save:true }));
        dispatch(cuentasActions.get({ destinatario: destinatario.id, fecha: moment().format('YYYY-MM-DD'), save:true, page: 1 }));
    }, [dispatch, destinatario] );

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        setLoading(true);

        const payload = {
            ...documento,
            cargas: documento.cargas.filter(c => (Number(c.monto) > 0)),
            cobros: documento.cobros.filter(c => (Number(c.monto) !== 0)),
            cajas: documento.cajas.filter(c => (Number(c.monto) > 0)),
            resultados: documento.resultados.filter(r => (Number(r.monto) > 0)),
        }
        
        dispatch(comprobantesActions.send(moduleHandler, payload))
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
    },[documento]);

    if (loading) return <Spinner />

    return (
        <form onSubmit={handleSubmit} name="form_cbte" method="POST">
            <Encabezado 
                documento={documento} 
                setDocumento={setDocumento} 
                onlyRead={onlyRead}
                moduleHandler={moduleHandler}
            />

            {/* Seccion de Cargas */}
            {documento.receipt.receipt_type && ((loadingIngresos || loadingCajas) ? <Spinner /> : <Appendable 
                documento={documento} 
                setDocumento={setDocumento} 
                onlyRead={onlyRead}
                title={{
                    cliente: "Creditos",
                    proveedor: "Deudas",
                    caja: "Cargar dinero"
                }[moduleHandler]}
                handler="cargas"
                fields={[           
                    {
                    type: 'select',
                    name: 'concepto',
                    label: 'Concepto',
                    choices: [...ingresos, ...cajas]
                    },
                    {
                    type: 'date',
                    name: 'periodo',
                    label: 'Periodo',
                    },
                    {
                    type: 'date',
                    name: 'fecha_gracia',
                    label: 'Descuento',
                    },            
                    {
                    type: 'date',
                    name: 'fecha_vencimiento',
                    label: 'Vencimiento',
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
                ]}
                cleanedField={{
                    concepto: '',
                    periodo: moment().format('YYYY-MM-DD'),
                    fecha_gracia: moment().format('YYYY-MM-DD'),
                    fecha_vencimiento: moment().format('YYYY-MM-DD'),
                    detalle: '',
                    cantidad: 0,
                    monto: 0,
                }}
            />)
            }


            {/* Clientes: Seccion de Cobros */}
            {documento.receipt.receipt_type && (loadingDeudas ? <Spinner /> : <Selectable 
                documento={documento} 
                setDocumento={setDocumento} 
                onlyRead={onlyRead}
                color='bg-light'
                title={{
                    cliente: "Items pendientes de cobro",
                    proveedor: "Items pendientes de pago",
                    caja: "Items pendientes de cobro"
                }[moduleHandler]}
                handler="cobros"
                rows={documento.cobros.length > 0 ? documento.cobros: deudas}
            />)
            }

            {/* Seccion de Cajas */}
            {documento.receipt.receipt_type && !documento.receipt.receipt_type.includes("Nota de Credito") && (loadingCajas ? <Spinner /> : <Appendable 
                documento={documento} 
                setDocumento={setDocumento} 
                onlyRead={onlyRead}
                title={moduleHandler === "caja" ? "Descargar dinero" : "Formas de pago"}
                handler="cajas"
                fields={[
                    {
                    type: 'select',
                    name: 'cuenta',
                    label: 'Cuenta',
                    choices: cajas
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
                ]}
                cleanedField={{
                    cuenta: '',
                    detalle: '',
                    fecha_vencimiento: moment().format('YYYY-MM-DD'),
                    monto: 0,
                }}
            />)
            }


            {/* Seccion de Resultados */}
            {documento.receipt.receipt_type && documento.receipt.receipt_type.includes("Nota de Credito") && ((loadingIngresos || loadingGastos) ? <Spinner /> : <Appendable 
                documento={documento} 
                setDocumento={setDocumento} 
                onlyRead={onlyRead}
                title="Resultados a generar"
                handler="resultados"
                fields={[
                    {
                    type: 'select',
                    name: 'cuenta',
                    label: 'Cuenta',
                    choices: [...ingresos, ...gastos]
                    },
                    {
                    type: 'text',
                    name: 'detalle',
                    label: 'Detalle',
                    },                 
                    {
                    type: 'date',
                    name: 'periodo',
                    label: 'Período',
                    },          
                    {
                    type: 'number',
                    name: 'monto',
                    label: 'Monto',
                    },                        
                ]}
                cleanedField={{
                    cuenta: '',
                    detalle: '',
                    periodo: moment().format('YYYY-MM-DD'),
                    monto: 0,
                }}
            />)
            }    

                
            {documento.receipt.receipt_type && documento.fecha_operacion && <Portlet 
                title="Descripción"
                handler="descripcion">
                <div className="row">
                    <div className="col-md-12">
                    
                    <textarea 
                        type="text" 
                        id='descripcion' 
                        name="descripcion" 
                        disabled={onlyRead}
                        className="form-control" 
                        value={documento.descripcion || ''}
                        onChange={(e) => setDocumento({...documento, descripcion: e.target.value})}
                    />
                    </div>            
                </div>                        
            </Portlet>}

            <div className="panel-footer mt-3">
                <div className="row">
                    <div className="col-sm-6">
                        <a onClick={onClose} className="btn btn-outline-danger btn-block">Cancelar</a>
                    </div>
                    <div className="col-sm-6 text-end">
                    {documento.pdf && <a href={documento.pdf} target="_blank" className="btn btn-bordered btn-warning btn-block mx-1">Imprimir</a>}
                    {!onlyRead && <button disabled={!canSend} onClick={handleSubmit} type="submit" className="btn btn-bordered btn-primary btn-block mx-1">Guardar</button>}
                    </div>
                </div>
            </div>
        </form>
    );
};
