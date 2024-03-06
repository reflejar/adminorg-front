'use client'
import React, { useState } from 'react';
import { useEstadoCuenta } from '@/utility/hooks';
import Spinner from '@/components/spinner';
import Listado from '@/components/listados';


import BasicModal from '@/components/modal';
import Comprobante from '@/components/CRUD/comprobante/CU';


export default function Deudas(props) {
  const { selected } = props;
  const [cuentas, loadingCuentas, infoPaginator] = useEstadoCuenta(selected);
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

  const data = [...cuentas];
  const columns =[{
      label: 'Fecha',
      key: 'fecha'
    }, {
      label: 'Comprobante',
      key: 'nombre',
      onClick: handleModal
    }, {
      label: 'Monto',
      key: 'total',
    }, {
      label: 'Saldo',
      key: 'saldo',
    }];  



  const renderModal = () => {
    if (modal.item && modal.item.receipt) {
      const { receipt } = modal.item
      return (
          <BasicModal
            open={modal.open}
            onToggle={handleModal}
            header={`${receipt.receipt_type} - ${receipt.formatted_number}`}
            footer={false}
            component={<Comprobante 
                moduleHandler={modal.item.causante} 
                destinatario={selected}
                documentoId={modal.item.id}
                onClose={handleModal}
                onlyRead={true} 
              />}
            
          />          
        )
    } 
  }

  if (loadingCuentas) return <Spinner />

  return (<>
    {modal && modal.item && renderModal()}
    <Listado items={data} columns={columns} paginator={infoPaginator} />
    </>
    );
};



