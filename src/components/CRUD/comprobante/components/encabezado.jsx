import { usePuntosDeVenta } from "@/utility/hooks";
import CHOICES from "./choices";
import Portlet from "./portlet";

export default function Encabezado ({
    documento,
    setDocumento,
    onlyRead,
    moduleHandler
    }) {

    const types = CHOICES.receiptTypes[moduleHandler]
    const [point_of_sales] = usePuntosDeVenta();

    const handleChange = (e) => {
        if (e.target.value !== "---") {
            const name = e.target.name
            const subfields = name.split(".")
            subfields.length > 1 ?
                setDocumento({
                ...documento,
                [subfields[0]]: {
                    ...documento[subfields[0]],
                    [subfields[1]]: e.target.value
                }
                }) :
                setDocumento({
                ...documento,
                [name]: e.target.value
                })
        }
    }

    return (
        <Portlet title="Encabezados" handler='encabezados'>
            <div className="row">
                <div className="col-md-2 px-1">
                <label htmlFor="receipt.receipt_type">Tipo</label>
                <select 
                    className="form-control" 
                    name="receipt.receipt_type" 
                    id="receipt.receipt_type"
                    disabled={onlyRead}
                    onChange={handleChange}
                    value={documento.receipt.receipt_type || ''}
                    >
                    <option value=''> --- </option>
                    {types.map((type, i) => (
                        <option key={i} value={type.value}>{type.value}</option>
                    ))}
                </select>
                </div>
                <div className="col-md-2 px-1">
                <label htmlFor="receipt.point_of_sales">Punto Vta</label>
                {(moduleHandler === "cliente") || (documento.receipt && ["Orden de Pago X", "Transferencia X"].indexOf(documento.receipt.receipt_type) >= 0) && point_of_sales ? <select 
                className="form-control"
                name="receipt.point_of_sales" 
                id="receipt.point_of_sales" 
                disabled={onlyRead}
                onChange={handleChange}
                value={documento.receipt.point_of_sales || ''}
                >
                <option value=''> --- </option>
                    {point_of_sales.map((point, i) => (
                        <option key={i} value={point.id}>{point.number}</option>
                    ))}
                </select> : 
                    <input 
                    type="number" 
                    className="form-control" 
                    name="receipt.point_of_sales" 
                    id="receipt.point_of_sales"
                    min="0" 
                    onChange={handleChange}
                    value={documento.receipt.point_of_sales || ''}
                    />           
                
                
                }
                
                </div>            
                <div className="col-md-2 px-1">
                <label htmlFor="receipt.receipt_number">N°</label>
                <input 
                    type="number" 
                    className="form-control" 
                    disabled={
                    (moduleHandler === "cliente") || 
                    (documento.receipt && ["Orden de Pago X", "Transferencia X"].indexOf(documento.receipt.receipt_type) >= 0)
                    }
                    name="receipt.receipt_number" 
                    id="receipt.receipt_number" 
                    onChange={handleChange}
                    value={documento.receipt.receipt_number || ''}
                />
                </div>              
                <div className="col-md-2 px-1">
                <label htmlFor="receipt.issued_date">Fecha Cbte.</label>
                <input 
                    className="form-control" 
                    name="receipt.issued_date" 
                    type="date" 
                    disabled={onlyRead}
                    onChange={handleChange}
                    value={documento.receipt.issued_date || ''}
                />
                </div>               
                <div className="col-md-2 px-1">
                <label htmlFor="fecha_operacion">Fecha Op.</label>
                <input 
                    className="form-control" 
                    name="fecha_operacion" 
                    type="date" 
                    disabled={onlyRead}
                    onChange={handleChange}
                    value={documento.fecha_operacion || ''}
                />
                </div>                    
            </div>
        </Portlet>
    )
};