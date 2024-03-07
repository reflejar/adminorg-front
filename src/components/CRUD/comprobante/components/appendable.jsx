import { useEffect, useState } from "react"
import Portlet from "./portlet"

export default function Appendable ({ documento, setDocumento, onlyRead, title, handler, fields, cleanedField }) {

    let initialGrouping = [...documento[handler]]
    if (!onlyRead) initialGrouping.push(cleanedField)
    const [grouped, setGrouped] = useState(initialGrouping)

    useEffect(() => {
        setDocumento(() => ({
        ...documento,
        [handler]: grouped
        }))

    }, [grouped])

    const handleChange = (e) => {
        e.preventDefault()
        const [row, name] = e.target.name.split('.')
        setGrouped(() => {
        grouped[row][name] = e.target.value
        return [...grouped]
        })
    }

    const AppendCleanFieldsGroup = (e) => {
        e.preventDefault()
        setGrouped((groups) => ([...groups, cleanedField]))
    }
    const RemoveLastFieldsGroup = (e) => {
        e.preventDefault()
        const lastElement = grouped.length-1
        if (lastElement >= 1) {
        setGrouped((groups) => ([...groups.filter((_, i) => i !== lastElement)]))
        }
}




    const renderField = (field, value, fi) => {
        switch (field.type) {
        case 'select':
            return <td><select  disabled={onlyRead} className="form-control input-sm" name={`${fi}.${field.name}`} value={value || ''} onChange={handleChange}>
            <option value=''> --- </option>
            {field.choices.map((c, i) => (
                <option key={i} value={c.id}>{c.full_name}</option>
            ))}
            </select></td>
        case 'date':
            return <td><input disabled={onlyRead}  className="form-control input-sm" type="date" name={`${fi}.${field.name}`} value={value || ''} onChange={handleChange} /></td>
        case 'text':
            return <td><input disabled={onlyRead}  className="form-control input-sm" type="text" name={`${fi}.${field.name}`} value={value || ''} onChange={handleChange} /></td>
        case 'number':
            return <td><input disabled={onlyRead}  className="form-control input-sm" type="number" min={0} name={`${fi}.${field.name}`} value={value || ''} onChange={handleChange} /></td>
        case 'hidden':
            return <input disabled={onlyRead}  type="hidden" className="d-none" name={`${fi}.${field.name}`} value={value} />
        default:
            break;
        }
    }

    return (
        <Portlet title={title} handler={handler}>
        <div className="row">
            <div className="col-md-12">
            <table className="table table-condensed">
                <thead>
                <tr>
                    {fields.filter(f => f.type !== "hidden").map((field, i) => (<th key={i}>
                    {field.label}
                    </th>))}
                </tr>
                </thead>
                <tbody>
                {grouped.map((fieldset, fi) => (
                    <tr key={fi}>
                        {fields.map((field, i) =>(renderField(field, fieldset[field.name], fi)))}
                    </tr>
                ))}

                </tbody>
            </table>
            </div>            
            {!onlyRead && <div className="col-md-offset-6 text-end">
            <button onClick={RemoveLastFieldsGroup} className="btn btn-sm btn-danger mx-1 text-right"><span className="bi-dash"></span></button>
            <button onClick={AppendCleanFieldsGroup} className="btn btn-sm btn-success mx-1 text-right"><span className="bi-plus"></span></button>
            </div>}
            
        </div>
        </Portlet>
    )  
};