'use client'
import React, { useEffect, useState } from 'react';

import Spinner from '@/components/spinner';
import moment from 'moment';

import BasicModal from '@/components/modal';
import Comprobante from '@/components/CRUD/comprobante/CU';
import Listado from '@/components/listados';
import { useDispatch, useSelector } from 'react-redux';
import { saldosActions } from '@/redux/actions/saldos';

export default function (props) {
  const { selected } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const saldos = useSelector(state => state.saldos.list)
  // const saldos = useSelector(state => state.saldos.list)

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
      key: 'comprobante',
      onClick: handleModal
    }, {
      label: 'Concepto',
      key: 'concepto'
    }, {
      label: 'Proyecto',
      key: 'proyecto',
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
    if (modal.item && modal.item.comprobante) {
      return (
          <BasicModal
            open={modal.open}
            onToggle={handleModal}
            header={modal.item.comprobante}
            footer={false}
            component={<Comprobante 
                moduleHandler={"cliente"} 
                destinatario={selected}
                comprobanteId={modal.item.comprobante__id}
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



