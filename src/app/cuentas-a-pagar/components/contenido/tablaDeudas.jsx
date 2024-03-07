'use client'
import React, { useEffect, useState } from 'react';

import Spinner from '@/components/spinner';
import moment from 'moment';

import BasicModal from '@/components/modal';
import Comprobante from '@/components/CRUD/comprobante/CU';
import Listado from '@/components/listados';
import { useDispatch, useSelector } from 'react-redux';
import { deudasActions } from '@/redux/actions/deudas';

export default function Deudas(props) {
  const { selected } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const deudas = useSelector(state => state.deudas.list)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Despacha las acciones de forma secuencial
        await dispatch(deudasActions.get({ destinatario: selected.id, fecha: moment(new Date()).format('YYYY-MM-DD'), save: true }));
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
      return (
          <BasicModal
            open={modal.open}
            onToggle={handleModal}
            header={modal.item.documento}
            footer={false}
            component={<Comprobante 
                moduleHandler={"proveedor"} 
                destinatario={selected}
                documentoId={modal.item.documento__id}
                onClose={handleModal}
                onlyRead={true} 
              />}
            
          />          
        )
    } 
  }

  if (loading) return <Spinner />

  return (<>
    {modal && modal.item && renderModal()}
    <Listado items={deudas} columns={columns} />
    </>
    );
};



