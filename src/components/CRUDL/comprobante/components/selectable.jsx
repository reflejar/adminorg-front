import { useEffect, useState } from "react"
import Portlet from "./portlet"


export default function Selectable ({ documento, setDocumento, onlyRead, title, handler, rows }) {
    const [grouped, setGrouped] = useState(
        rows.map(obj=> ({
            vinculo: obj.id, 
            concepto: obj.concepto, 
            periodo: obj.periodo, 
            monto:obj.monto, 
            checked:false,
            descripcion: obj.descripcion
        }))
    )

    const handleChange = (e) => {
        e.preventDefault()
        const [row, name] = e.target.name.split('.')
        setGrouped(() => {
        if (name === "vinculo") {
            grouped[row]['checked'] = !grouped[row]['checked']
        } else {
            grouped[row][name] = e.target.value
        }
        return [...grouped]
        })
    }

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
                <tr>
                    <th></th>
                    {Object.keys(grouped[0]).map((t, i) => (<th key={i}>{t}</th>))}
                </tr>
                </thead>
                <tbody>
                {grouped.map((row, i) => {
                    return (<tr key={i}>
                    <td>
                        <input 
                        className="form-check-label input-sm" 
                        type="checkbox" 
                        value={row.vinculo} 
                        name={`${i}.vinculo`} 
                        checked={row.checked} 
                        onChange={handleChange}
                        />
                    </td>
                    <td>{row.concepto}</td>
                    <td>
                        <input 
                        className="form-control input-sm" 
                        type="number" 
                        value={row.monto} 
                        name={`${i}.monto`} 
                        onChange={handleChange}
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