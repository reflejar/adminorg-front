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

  const columns =[{
      label: 'Fecha',
      key: 'fecha'
    }, {
      label: 'Comprobante',
      key: 'documento',
      onClick: handleModal
    }, {
      label: 'Concepto',
      key: 'concepto',
    }, {
      label: 'Monto',
      key: 'valor',
    }, {
      label: 'Saldo',
      key: 'saldo',
    }];  



  const renderModal = () => {
    if (modal.item && modal.item.documento) {
      return (
          <BasicModal
            open={modal.open}
            onToggle={handleModal}
            header={modal.item.documento}
            footer={false}
            component={<Comprobante 
                moduleHandler={'cliente'} 
                destinatario={selected}
                documentoId={modal.item.documento__id}
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
    <Listado items={cuentas} columns={columns} paginator={infoPaginator} />
    </>
    );
};



