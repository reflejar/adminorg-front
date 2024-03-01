'use client'
import React, { useMemo, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { get } from 'lodash';
import ReactToPrint from 'react-to-print';
import {Numero} from "@/utility/formats";

const Listado = ({ items, columns }) => {
    const ref = useRef(null);

    const dataForTable = useMemo(() => {
        if (items && !items.length) {
        return [];
        }
        return items;
    }, [items]);

    return (
        <div>
                <ReactToPrint
                trigger={() => <button className='btn btn-sm bi-printer btn-outline-secondary mx-2'/>}
                content={() => ref.current}
                />

                <CSVLink
                target="_blank"
                filename="adminorg.csv"
                headers={columns}          
                data={dataForTable}>
                    <button className='btn btn-sm bi-filetype-csv btn-outline-success' />
                </CSVLink>

            <table className='table table-responsive table-sm table-striped'>
                <thead>
                <tr>
                    {columns.map(t => (
                        <th key={t.key}>
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
  