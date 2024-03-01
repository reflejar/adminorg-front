'use client'
import React, { useMemo, useState, useRef, useCallback } from 'react';
import moment from "moment";
import { useDispatch } from 'react-redux';
import ReactToPrint from 'react-to-print';
import { CSVLink } from 'react-csv';
import { Table, Button, Form, Input, Row, Col, FormGroup, Label } from 'reactstrap';

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
      <Form className="row" onSubmit={handleSearch}>
        <FormGroup className='col-sm-4 px-3'>
          <Label>Tipo de documento</Label>
          <Input type="select" name="select" onChange={handleChange('receipt_type')}>
            <option value=''>---</option>
            {documentosTypes.map((type, i) => (
              <option key={i} value={type}>{type}</option>
            ))}
          </Input>
        </FormGroup>  

        <FormGroup className='col-sm-4 px-3'>
          <Label>Punto de venta</Label>

          <Input type="select" name="select" onChange={handleChange('point')}>
            <option value=''>---</option>
            {puntos.map((punto, i) => (
              <option key={i} value={punto.number}>{punto.number}</option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup className='col-sm-4 px-3'>
          <Label>Numero de documento</Label>
          <Input
            value={fields.numero}
            placeholder="#12345"
            label="Numero de documento"
            onChange={handleChange('numero')} />
        </FormGroup>

            <FormGroup className='col-sm-4 px-3'>
              <Label>Desde</Label>
              <Input
                type="date"
                name="start_date"
                placeholder="Fecha desde"
                onChange={handleChange('startDate')}
              />
            </FormGroup>

            <FormGroup className='col-sm-4 px-3'>
              <Label>Hasta</Label>
              <Input
                type="date"
                name="end_date"
                placeholder="Fecha hasta"
                onChange={handleChange('endDate')}
              />
            </FormGroup>
        <div className="text-end">
        <Button type="submit" color="primary" className='mb-2 '>
          Buscar
        </Button>
        </div>
      </Form>
    );
  }

  return <Listado columns={headers} items={dataForTable} />;
};

export default LStep;
