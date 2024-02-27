'use client'
import React, { useMemo, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { get } from 'lodash';
import ReactToPrint from 'react-to-print';


const Listado = ({ items, columns }) => {
    const ref = useRef(null);

    const dataForTable = useMemo(() => {
        if (items && !items.length) {
        return [];
        }
        return items;
    }, [items]);

    return (
        <div className="registration__results">
            <div className="registration__actions">
                <ReactToPrint
                trigger={() => <div className='btn btn-outline-secondary mx-2' outline>Imprimir</div>}
                content={() => ref.current}
                />

                <CSVLink
                target="_blank"
                filename="adminsmart-clientes.csv"
                headers={columns}          
                data={dataForTable}>
                <div className='btn btn-outline-secondary'>
                    CSV
                </div>
                </CSVLink>
            </div>

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
                            {columns.map((te, k) => (<td key={k}>{get(item, te.key, null)}</td>))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};



export default Listado
  