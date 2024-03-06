import { useEffect, useState } from "react"
import Portlet from "./portlet"


export default function Selectable ({ documento, setDocumento, onlyRead, title, handler, rows }) {
    const [grouped, setGrouped] = useState(rows.map(obj=> ({
            vinculo: obj.id, 
            concepto: obj.concepto + " - " + obj.periodo, 
            monto:obj.saldo ? obj.saldo : obj.monto, 
            max:obj.saldo ? obj.saldo : obj.monto, 
            checked:false,
            detalle: ''
        }))
    )

    const handleChange = (e) => {
        e.preventDefault();
        const [row, name] = e.target.name.split('.');
        const newGrouped = [...grouped]; // Crear una nueva copia del estado
    
        if (name === "vinculo") {
            newGrouped[row]['checked'] = !newGrouped[row]['checked'];
        } else {
            if (+e.target.max >= +e.target.value) {
                newGrouped[row][name] = e.target.value;
            }
        }
    
        setGrouped(newGrouped);
    };

    useEffect(() => {
        setDocumento(() => ({
        ...documento,
        [handler]: grouped.filter(g => (g.monto > 0 && g.checked === true))
        }))

    }, [grouped])


    return (
        <Portlet title={title} handler={handler} display={(["utilizaciones_disponibilidades", "utilizaciones_saldos"].includes(handler) ? "" : "in")}>
        <div className="row">
            <div className="col-md-12">
            {grouped.length === 0 ? <div className="text-center fs-4">...No hay items...</div> : <table className="table table-condensed table-responsive">
                <thead>
                <tr className="row">
                    <th className="col-md-2"></th>
                    <th className="col-md-8">Concepto</th>
                    <th className="col-md-2">Monto</th>
                </tr>
                </thead>
                <tbody>
                {grouped.map((row, i) => {
                    return (<tr key={i} className="row" >
                    <td className="col-md-2">
                        <input 
                        className="form-check" 
                        type="checkbox" 
                        value={row.vinculo} 
                        name={`${i}.vinculo`} 
                        checked={row.checked} 
                        disabled={onlyRead}
                        onChange={handleChange}
                        />
                    </td>
                    <td className={`col-md-8 ${onlyRead && "text-muted"}`}>{row.concepto}</td>
                    <td className="col-md-2">
                        <input 
                        className="form-control input-sm "
                        type="number" 
                        value={row.monto} 
                        name={`${i}.monto`} 
                        disabled={onlyRead}
                        onChange={handleChange}
                        max={row.max} 
                        />
                    </td>
                    </tr>)
                })}

                </tbody>
            </table>}
            </div>
        </div>
        </Portlet>
    )  
};