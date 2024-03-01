import {useState, useCallback, useEffect} from "react"
import Portlet from "./components/portlet";
import Encabezado from "./components/encabezado";
import Selectable from "./components/selectable";
import Appendable from "./components/appendable";
import { useCajas, useDeudas, useDisponibilidades, useGastos, useIngresos, useSaldos } from "@/utility/hooks";
import { deudasActions } from '@/redux/actions/deudas';
import { saldosActions } from '@/redux/actions/saldos';
import { cuentasActions } from '@/redux/actions/cuentas';
import { documentosActions } from '@/redux/actions/documentos';
import { useDispatch } from "react-redux";
import Spinner from "@/components/spinner/spinner";
import moment from "moment";


export default function Comprobante({ moduleHandler, destinatario, documentoId, onlyRead, onClose }) {

    const dispatch = useDispatch();
    const [ingresos, loadingIngresos] = useIngresos();
    const [cajas, loadingCajas] = useCajas();
    const [gastos, loadingGastos] = useGastos();
    const [deudas, loadingDeudas] = useDeudas(destinatario);
    const [saldos, loadingSaldos] = useSaldos(destinatario);
    const [disponibilidades, loadingDisponibilidades] = useDisponibilidades();
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
    });

    useEffect(() => {
        
        if (documentoId) {
            setLoading(true);
    
            dispatch(documentosActions.get(moduleHandler, documentoId))
            .then((doc) => setDocumento(doc))
            .finally(() => setLoading(false));
          }
    
    
    }, []);          

    useEffect(() => {

        if (moduleHandler === "cliente") {
            switch (documento.receipt.receipt_type) {
                case "Factura X":
                    setDocumento(({ 
                        resultados,
                        cobros,
                        cajas,
                        utilizaciones_saldos,
                        utilizaciones_disponibilidades,
                        ...documento}) => ({
                            ...documento,
                            creditos: (documento && documento.creditos) ? documento.creditos : []
                        }));
                    break;
                case "Nota de Credito X":
                    setDocumento(({ 
                        creditos,
                        cajas,
                        utilizaciones_saldos,
                        utilizaciones_disponibilidades,
                        ...documento }) => ({
                            ...documento,
                            cobros: (documento && documento.cobros) ? documento.cobros : [],
                            resultados: (documento && documento.resultados) ? documento.resultados : []
                        }));
                    break;
                case "Recibo X":
                    setDocumento(({ 
                        creditos,
                        resultados,
                        ...documento }) => ({
                            ...documento,
                            cobros: (documento && documento.cobros) ? documento.cobros : [],
                            cajas: (documento && documento.cajas) ? documento.cajas : [],
                            utilizaciones_saldos: (documento && documento.utilizaciones_saldos) ? documento.utilizaciones_saldos : [],
                            utilizaciones_disponibilidades: (documento && documento.utilizaciones_disponibilidades) ? documento.utilizaciones_disponibilidades : []
                        }));
                    break;                         
                        
                default:
                    setDocumento(({
                        creditos,
                        cobros,
                        resultados,
                        cajas,
                        utilizaciones_saldos,
                        utilizaciones_disponibilidades,
                        ...documento}) => ({...documento}))
                    break;
            }
        }


    }, [documento.receipt.receipt_type])

    const validate = () => {
        switch (moduleHandler) {
            case 'cliente':
                if (documento.receipt.point_of_sales === '') return false

                switch (documento.receipt.receipt_type) {
                    case 'Factura X':
                        const incomplete = documento.creditos ? documento.creditos.filter(c => (c.destinatario === "" || c.concepto === "" || c.monto === "" || c.monto == 0)) : []
                        return incomplete.length === 0
                    case 'Recibo X':
                        const totalCobrosRecibo = documento.cobros ? documento.cobros.reduce((total, current) => total + Number(current['monto']), 0) : []
                        const totalCajasRecibo = documento.cajas ? documento.cajas.reduce((total, current) => total + Number(current['monto']), 0) : []
                        const totalSaldosRecibo = documento.utilizaciones_saldos ? documento.utilizaciones_saldos.reduce((total, current) => total + Number(current['monto']), 0) : []
                        const totalPagos = totalCajasRecibo + totalSaldosRecibo
                        if (totalPagos > 0) return totalPagos >= totalCobrosRecibo
                    case 'Nota de Credito X':
                        const totalCobrosNotaDeCredito = documento.cobros ? documento.cobros.reduce((total, current) => total + Number(current['monto']), 0) : []
                        const totalResultadosNotaDeCredito = documento.resultados ? documento.resultados.filter(r => r.cuenta !== "").reduce((total, current) => total + Number(current['monto']), 0) : []
                        return totalCobrosNotaDeCredito === totalResultadosNotaDeCredito
                    default:
                        return false
                }
        
            default:
                return false
        }
    }


    useEffect(() => {
        setCanSend(validate(documento))
    }, [documento])
    
    const updateSituation = useCallback(() => {
        dispatch(deudasActions.get({ destinatario: destinatario.id, fecha: moment().format('YYYY-MM-DD'), save:true }));
        dispatch(saldosActions.get({ destinatario: destinatario.id, fecha: moment().format('YYYY-MM-DD'), save:true }));
        dispatch(cuentasActions.get({ destinatario: destinatario.id, fecha: moment().format('YYYY-MM-DD'), save:true, page: 1 }));
    }, [dispatch, destinatario] );

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        setLoading(true);
        
        dispatch(documentosActions.send(moduleHandler, documento))
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

            {/* Clientes: Seccion de Creditos */}
            {documento.creditos && ((loadingIngresos || loadingCajas) ? <Spinner /> : <Appendable 
                documento={documento} 
                setDocumento={setDocumento} 
                onlyRead={onlyRead}
                title="Creditos"
                handler="creditos"
                fields={[
                    {
                    type: 'hidden',
                    name: 'destinatario',
                    },                    
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
                    destinatario: destinatario.id,
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

            {/* Proveedores: Seccion de Debitos */}
            {/* {Object.keys(fieldsLists).length > 0 && fieldsLists.debitos && <Appendable 
            documento={documento} 
            setDocumento={setDocumento} 
            onlyRead={onlyRead}
            title="Debitos"
            handler="debitos"
            fields={[
                {
                type: 'select',
                name: 'cuenta',
                label: 'Cuenta',
                choices: CHOICES.debitos.cuenta
                },
                {
                type: 'date',
                name: 'periodo',
                label: 'Periodo',
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
            />
            }         */}

            {/* Clientes: Seccion de Cobros */}
            {documento.cobros && (loadingDeudas ? <Spinner /> : <Selectable 
                documento={documento} 
                setDocumento={setDocumento} 
                onlyRead={onlyRead}
                title="Items pendientes de cobro"
                handler="cobros"
                rows={deudas}
            />)
            }        

            {/* Proveedores: Seccion de Deudas */}
            {/* {Object.keys(fieldsLists).length > 0 && fieldsLists.pagos && <Selectable 
            documento={documento} 
            setDocumento={setDocumento} 
            onlyRead={onlyRead}
            title="Items pendientes de pago"
            handler="pagos"
            rows={CHOICES.pagos.vinculo}
            />
            }               */}

            {/* Seccion de Cajas */}
            {documento.cajas && (loadingCajas ? <Spinner /> : <Appendable 
                documento={documento} 
                setDocumento={setDocumento} 
                onlyRead={onlyRead}
                title="Formas de pago"
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
            {documento.resultados && ((loadingIngresos || loadingGastos) ? <Spinner /> : <Appendable 
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

            {/* Seccion de Utilización de saldos */}
            {documento.utilizaciones_saldos && saldos.length > 0 && (loadingSaldos ? <Spinner /> : <Selectable 
                documento={documento} 
                setDocumento={setDocumento} 
                onlyRead={onlyRead}
                title="Utilizar saldos anteriores"
                handler="utilizaciones_saldos"
                rows={saldos}
            />)
            }   

            {/* Seccion de Utilización de disponibilidades */}
            {documento.utilizaciones_disponibilidades && disponibilidades && disponibilidades.length > 0 && (loadingDisponibilidades ? <Spinner /> : <Selectable 
                documento={documento} 
                setDocumento={setDocumento} 
                onlyRead={onlyRead}
                title="Utilizar disponibilidades"
                handler="utilizaciones_disponibilidades"
                rows={disponibilidades}
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
