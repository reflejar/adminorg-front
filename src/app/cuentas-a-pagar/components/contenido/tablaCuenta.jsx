'use client'
import React, { useState } from 'react';
import { useMovimientos } from '@/utility/hooks';
import Spinner from '@/components/spinner';
import Listado from '@/components/listados';


import BasicModal from '@/components/modal';
import Comprobante from '@/components/CRUD/comprobante/CU';


export default function (props) {
  const { selected } = props;
  const [movimientos, loadingMovimientos] = useMovimientos(selected);
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
    label: 'Proyecto',
    key: 'proyecto',
  }, {      
    label: 'Monto',
    key: 'monto',
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
                  moduleHandler={'proveedor'} 
                  destinatario={selected}
                  documentoId={modal.item.documento__id}
                  onClose={handleModal}
                />}
              
            />          
          )
      } 
    }

  if (loadingMovimientos) return <Spinner />

  return (<>
    {modal && modal.item && renderModal()}
    <Listado items={movimientos} columns={columns} />
    </>
    );
};



