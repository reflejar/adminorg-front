'use client'
import React, { useEffect, useState } from 'react';

import {Numero} from "@/utility/formats";
import { useEstadoCuenta } from '@/utility/hooks';
import Spinner from '@/components/spinner/spinner';

import BasicModal from '@/components/modal/basic';
import Comprobante from '@/components/CRUDL/comprobante/CU';


export default function Deudas(props) {
  const { selected } = props;
  const [cuentas, loadingCuentas] = useEstadoCuenta(selected);
  const [modal, setModal] = useState({
            open: false,
            item: null
        });
  

  const data = [...cuentas];
  const columns =[{
      Header: 'Fecha',
      accessor: 'fecha'
    }, {
      Header: 'Documento',
      accessor: 'nombre'
    }, {
      Header: 'Monto',
      accessor: 'total',
    }, {
      Header: 'Saldo',
      accessor: 'saldo',
    }];  


  const handleToggle = (rowInfo) => {
    setModal({
        open: !modal.open,
        item: rowInfo
    });
  };


  const renderModal = () => {
    if (modal.item && modal.item.receipt) {
      const { receipt } = modal.item
      return (
          <BasicModal
            open={modal.open}
            onToggle={handleToggle}
            header={`${receipt.receipt_type} - ${receipt.formatted_number}`}
            footer={false}
            component={<Comprobante 
                moduleHandler={modal.item.causante} 
                destinatario={selected}
                documentoId={modal.item.id}
                onClose={handleToggle}
                onlyRead={true} 
              />}
            
          />          
        )
    } 
  }

  if (loadingCuentas) return <Spinner />

  return (
      <div className="table-responsive min-vh-75">
        {modal && modal.item && renderModal()}
        <table className='table table-sm table-striped table-bordered text-nowrap'>
          <thead>
            <tr>
              {columns.map((col, key) => <th key={key}>{col.Header}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, keyTr) => <tr key={keyTr}>
              {columns.map((col, keyTd) => {
                const val = row[col.accessor]
                return <td 
                          key={keyTd} 
                          className={`${typeof val === "number" && "text-end"} ${col.Header === "Documento" && "pointer link-primary text-primary"}`}
                          onClick={() => {col.Header === "Documento" && handleToggle(row)}}
                          >
                            {typeof val === "number" ? Numero(val) : val}
                        </td>
              })}
            </tr>)}
          </tbody>
        </table>
    </div>

  );
};



