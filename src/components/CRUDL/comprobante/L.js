'use client'
import React, { useMemo, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Spinner from '@/components/spinner/spinner';
import { documentosActions } from '@/redux/actions/documentos';
import { usePuntosDeVenta } from '@/utility/hooks';
import Listado from '@/components/listados';

const initialFields = {
  receipt_type: '',
  point: '',
  numero: '',
  startDate: '',
  endDate: '',
};

const headers = [
  { label: 'Fecha', key: 'receipt.issued_date' },
  { label: 'Comprobante', key: 'nombre' },
  { label: 'Portador', key: 'portador' },
  { label: 'Total', key: 'receipt.total_amount' },
];

const LStep = ({ causante, documentosTypes }) => {
  const dispatch = useDispatch();
  const [table, setTable] = useState(false);
  const [fields, setFields] = useState(initialFields);
  const [puntos] = usePuntosDeVenta();
  const [loading, setLoading] = useState(false);
  const [documentos, setDocumentos] = useState([]);
  const ref = useRef(null);
  

  const dataForTable = useMemo(() => {
    if (table) {
      if (documentos && !documentos.length) {
        return [];
      }
      return documentos;
    }
  }, [table, documentos]);

  const handleSearch = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await dispatch(documentosActions.getList(causante, fields))
    .then((response) => {
      setDocumentos(response);
      setTable(true);
    })
    .finally(() => setLoading(false));;

    if (!response || !Array.isArray(response.results) || response.results.length === 0) {
      return;
    }

    ;
  }, [dispatch, causante, fields]);

  const handleChange = (key) => {
    return (event) => {
      const value = event.target.value;

      setFields(old => ({
        ...old,
        [key]: value
      }))
    };
  };

  if (loading) {
    return (
      <div className='loading-modal'>
        <Spinner />
      </div>
    )
  }

  if (!table) {
    return (
      <form className="row" onSubmit={handleSearch}>
        <div className='col-sm-4 px-3 my-2'>
          <label className='form-label'>Tipo de documento</label>
          <select type="select" name="select" className='form-select' onChange={handleChange('receipt_type')}>
            <option value=''>---</option>
            {documentosTypes.map((type, i) => (
              <option key={i} value={type}>{type}</option>
            ))}
          </select>
        </div>  

        <div className='col-sm-4 px-3 my-2'>
          <label className='form-label'>Punto de venta</label>

          <select type="select" name="select" className='form-select' onChange={handleChange('point')}>
            <option value=''>---</option>
            {puntos.map((punto, i) => (
              <option key={i} value={punto.number}>{punto.number}</option>
            ))}
          </select>
        </div>

        <div className='col-sm-4 px-3 my-2'>
          <label className='form-label'>Numero de documento</label>
          <input
            value={fields.numero}
            className='form-control'
            placeholder="#12345"
            label="Numero de documento"
            onChange={handleChange('numero')} />
        </div>

        <div className='col-sm-4 px-3 my-2'>
          <label className='form-label'>Desde</label>
          <input
            type="date"
            className='form-control'
            name="start_date"
            placeholder="Fecha desde"
            onChange={handleChange('startDate')}
          />
        </div>

        <div className='col-sm-4 px-3 my-2'>
          <label className='form-label'>Hasta</label>
          <input
            type="date"
            name="end_date"
            className='form-control'
            placeholder="Fecha hasta"
            onChange={handleChange('endDate')}
          />
        </div>
        <div className="text-end">
          <button type="submit" className='btn btn-primary mb-2'>Buscar</button>
        </div>
      </form>
    );
  }

  return <Listado columns={headers} items={dataForTable} />;
};

export default LStep;
