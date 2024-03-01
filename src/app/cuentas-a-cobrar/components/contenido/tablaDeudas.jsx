'use client'
import React, { useEffect, useState } from 'react';

import {Numero} from "@/utility/formats";
import { useDeudas, useSaldos } from '@/utility/hooks';
import Spinner from '@/components/spinner/spinner';

import BasicModal from '@/components/modal/basic';
import Comprobante from '@/components/CRUDL/comprobante/CU';
import Listado from '@/components/listados';

export default function Deudas(props) {
  const { selected } = props;
  const [deudas, loadingDeudas] = useDeudas(selected);
  const [saldos, loadingSaldos] = useSaldos(selected);
  const [modal, setModal] = useState({
            open: false,
            item: null
        });
  const handleModal = (rowInfo) => {
    setModal({
        open: !modal.open,
        item: rowInfo
    });
  };

  const data = [...saldos.map((saldo) => ({...saldo, monto: -saldo.monto, saldo: -saldo.saldo})), ...deudas];
  const columns = [{
      label: 'Fecha',
      key: 'fecha'
    }, {
      label: 'Documento',
      key: 'nombre',
      onClick: handleModal
    }, {
      label: 'Concepto',
      key: 'concepto'
    }, {
      label: 'Periodo',
      key: 'periodo'
    }, {
      label: 'Monto',
      key: 'monto',
    }, {
      label: 'Pagado/Utilizado',
      key: 'pago_capital',      
    }, {
      label: 'Saldo',
      key: 'saldo',
  }];    

  const renderModal = () => {
    if (modal.item && modal.item.documento) {
      const { receipt } = modal.item.documento
      return (
          <BasicModal
            open={modal.open}
            onToggle={handleModal}
            header={`${receipt.receipt_type} - ${receipt.formatted_number}`}
            footer={false}
            // component={selectDocument(modal.item.causante, modal.item.documento.receipt.receipt_type)}
            component={<Comprobante 
                moduleHandler={modal.item.causante} 
                destinatario={selected}
                documentoId={modal.item.documento.id}
                onClose={handleModal}
                onlyRead={true} 
              />}
            
          />          
        )
    } 
  }

  if (loadingDeudas || loadingSaldos) return <Spinner />

  return (<>
    {modal && modal.item && renderModal()}
    <Listado items={data} columns={columns} />
    </>
    );
};



