'use client'
import React, { useMemo, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { get } from 'lodash';
import ReactToPrint from 'react-to-print';
import {Numero} from "@/utility/formats";

const Listado = ({ items, columns, paginator }) => {
    const ref = useRef(null);

    const dataForTable = useMemo(() => {
        if (items && !items.length) {
        return [];
        }
        return items;
    }, [items]);

    return (
        <div>
            <div className="d-flex justify-content-between">
                <div>
                    <ReactToPrint
                        trigger={() => <button className='btn btn-sm bi-printer btn-outline-secondary me-2'/>}
                        content={() => ref.current}
                    />

                    <CSVLink
                    target="_blank"
                    filename="listado.csv"
                    headers={columns}          
                    data={dataForTable}>
                        <button className='btn btn-sm bi-filetype-csv btn-outline-success' />
                    </CSVLink>
                </div>
            <div className="btn-toolbar">
                
                    {paginator && <div className='d-flex '>
                        <div className="btn-group mr-2">
                            {paginator.has_previous && <button onClick={()=> paginator.setPage(paginator.page - 1)} className="btn btn-sm btn-outline-dark"><i className="bi-chevron-left" /></button>}
                            <button className="btn btn-sm btn-outline-dark active">{paginator.page}</button>
                            {paginator.has_next && <button onClick={()=> paginator.setPage(paginator.page + 1)} className="btn btn-sm btn-outline-dark"><i className="bi-chevron-right" /></button>}
                        </div>
                        {/* <input type="number" className='ms-3' style={{width: 40}} onChange={(e) => {
                            e.preventDefault()
                            e.target.value && paginator.setPage(e.target.value)
                        }} value={paginator.page} min={1} max={paginator.num_pages} /> */}
                    </div>}

                
                </div>
            </div>



            <table className='mt-3 table table-responsive table-sm table-striped'>
                <thead>
                <tr>
                    {columns.map(t => (
                        <th key={t.key} className={`${items.length > 0 && (typeof items[0][t.key] === "number") && "text-end"}`}>
                            {t.label}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            {columns.map((te, k) => {
                                const value = get(item, te.key, null)
                                return <td 
                                        className={`${te.onClick !== undefined && "pointer link-primary text-primary"} ${typeof value === "number" && "text-end"}`} 
                                        key={k}
                                        onClick={() => {te.onClick !== undefined && te.onClick(item)}}
                                        >
                                            {te.key === "" ? <i className='bi-pencil' />: typeof value === "number" ? Numero(value) : value}
                                        </td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};



export default Listado
  