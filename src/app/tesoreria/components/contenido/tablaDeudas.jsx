'use client'
import React, { useEffect, useState } from 'react';

import Spinner from '@/components/spinner';
import moment from 'moment';

import BasicModal from '@/components/modal';
import Comprobante from '@/components/CRUD/comprobante/CU';
import Listado from '@/components/listados';
import { useDispatch, useSelector } from 'react-redux';
import { saldosActions } from '@/redux/actions/saldos';

export default function Deudas(props) {
  const { selected } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const saldos = useSelector(state => state.saldos.list)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Despacha las acciones de forma secuencial
        await dispatch(saldosActions.get({ destinatario: selected.id, fecha: moment(new Date()).format('YYYY-MM-DD'), save: true }));
      } catch (error) {
        console.error('Error al despachar acciones:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selected) {
      fetchData();
    }
  }, [selected, dispatch]);


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
  
  const columns = [{
      label: 'Fecha',
      key: 'fecha'
    }, {
      label: 'Comprobante',
      key: 'documento',
      onClick: handleModal
    }, {
      label: 'Detalle',
      key: 'detalle'
    }, {
      label: 'Vencimiento',
      key: 'fecha_vencimiento'
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
            component={<Comprobante 
                moduleHandler={'caja'} 
                destinatario={selected}
                documentoId={modal.item.documento.id}
                onClose={handleModal}
              />}
            
          />          
        )
    } 
  }

  if (loading) return <Spinner />

  return (<>
    {modal && modal.item && renderModal()}
    <Listado items={saldos} columns={columns} />
    </>
    );
};



