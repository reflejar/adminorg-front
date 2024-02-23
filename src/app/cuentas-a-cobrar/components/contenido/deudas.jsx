'use client'
import React, { useState } from 'react';

import {Numero} from "@/utility/formats";
import { useDeudas, useSaldos } from '@/utility/hooks/dispatchers';
import Spinner from '@/components/spinner/spinner';

import BasicModal from '@/components/modal/basic';
import Comprobante from '@/components/CRUDL/comprobante/CU';

export default function Deudas(props) {
  const { selected } = props;
  const [deudas, loadingDeudas] = useDeudas(true, selected);
  const [saldos, loadingSaldos] = useSaldos(true, selected);
  const [modal, setModal] = useState({
            open: false,
            item: null
        });
  
  const data = [...saldos.map((saldo) => ({...saldo, monto: -saldo.monto, saldo: -saldo.saldo})), ...deudas];


  const handleToggle = (rowInfo) => {
    setModal({
        open: !modal.open,
        item: rowInfo
    });
  };

  const renderModal = () => {
    if (modal.item && modal.item.documento) {
      const { receipt } = modal.item.documento
      return (
          <BasicModal
            open={modal.open}
            onToggle={handleToggle}
            header={`${receipt.receipt_type} - ${receipt.formatted_number}`}
            footer={false}
            // component={selectDocument(modal.item.causante, modal.item.documento.receipt.receipt_type)}
            component={<Comprobante 
                moduleHandler={modal.item.causante} 
                destinatario={selected}
                documentoId={modal.item.documento.id}
                onClose={handleToggle}
                onlyRead={true} 
              />}
            
          />          
        )
    } 
  }

  const columns = [{
      Header: 'Fecha',
      accessor: 'fecha'
    }, {
      Header: 'Documento',
      accessor: 'nombre'
    }, {
      Header: 'Concepto',
      accessor: 'concepto'
    }, {
      Header: 'Periodo',
      accessor: 'periodo'
    }, {
      Header: 'Monto',
      accessor: 'monto',
    }, {
      Header: 'Pagado/Utilizado',
      accessor: 'pago_capital',      
    }, {
      Header: 'Intereses/Descuentos',
      accessor: 'interes',
    }, {
      Header: 'Saldo',
      accessor: 'saldo',
  }];    
  

  if (loadingDeudas || loadingSaldos) return <Spinner />

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



