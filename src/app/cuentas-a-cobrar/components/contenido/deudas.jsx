'use client'
import React, { useState } from 'react';

import {Numero} from "@/utility/formats";
import { useDeudas, useSaldos } from '@/utility/hooks/dispatchers';
import Spinner from '@/components/spinner/spinner';

import BasicModal from '@/components/modal/basic';
import Comprobante from '../CRUDL/factura/CR';
import NotaCredito from '../CRUDL/nota-credito/CR';
import ReciboX from '../CRUDL/recibo-x/CR';
import { facturasTypes, notasCreditoTypes, notasDebitoTypes, recibosTypes } from '../CRUDL/_options/receipt_types';

// Cosas de Tesoreria
import Transferencia from '@/app/tesoreria/CRUDL/transferencia/CU';
import { transferenciasTypes } from '@/app/tesoreria/CRUDL/_options/receipt_types';

 // Cosas de Contabilidad
import Asiento from '@/app/contabilidad/CRUDL/asiento/CU';
import { asientosTypes } from '@/app/contabilidad/CRUDL/_options/receipt_types';

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
    console.log(rowInfo)
    setModal({
        open: !modal.open,
        item: rowInfo
    });
  };

  const selectDocument = (causante, type) => {
    const { documento } = modal.item;
    let documentos = {};
    if (causante === "cliente") {
      facturasTypes.forEach((type) => {
        documentos[type.nombre] = <Comprobante
        onlyRead={true}
        onClose={handleToggle}
        selected={documento}
      />
      })
      notasDebitoTypes.forEach((type) => {
        documentos[type.nombre] = <Comprobante
        onlyRead={true}
        onClose={handleToggle}
        selected={documento}
      />
      })
      notasCreditoTypes.forEach((type) => {
        documentos[type.nombre] = <NotaCredito
        onlyRead={true}
        onClose={handleToggle}
        selected={documento}
      />
      })
      recibosTypes.forEach((type) => {
        documentos[type.nombre] = <ReciboX
        onlyRead={true}
        onClose={handleToggle}
        selected={documento}
      />
      })
      return documentos[type]
    }
    if (causante === "caja") {
      transferenciasTypes.forEach((type) => {
        documentos[type.nombre] = <Transferencia
        update={true}
        onClose={handleToggle}
        selected={documento}
      />
      })
      return documentos[type]
    }    
    if (causante === "asiento") {
      asientosTypes.forEach((type) => {
        documentos[type.nombre] = <Asiento
        update={true}
        onClose={handleToggle}
        selected={documento}
      />
      })
      return documentos[type]
    }
  }

  const renderModal = () => {
    if (modal.item && modal.item.documento) {
      const { receipt } = modal.item.documento
      return (
          <BasicModal
            open={modal.open}
            onToggle={handleToggle}
            header={`${receipt.receipt_type} - ${receipt.formatted_number}`}
            footer={false}
            component={selectDocument(modal.item.causante, modal.item.documento.receipt.receipt_type)}
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
      Header: 'Cuenta',
      accessor: "cuenta"
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
      <>
        {modal && modal.item && renderModal()}
        <table className='table table-responsive table-sm table-striped table-bordered'>
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
    </>

  );
};



