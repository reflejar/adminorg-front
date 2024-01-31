import React, { memo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Table, Button, Form, Input, Row, Col, FormGroup, Label } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import { CSVLink } from 'react-csv';
import get from 'lodash/get';

import { facturasActions } from '@/redux/actions/facturas';
import { usePuntosDeVenta } from '@/utility/hooks/dispatchers';

const initialFields = {
  id: '',
  startDate: '',
  endDate: '',
  points: ''
};

const headers = [
  { label: '#', key: 'key' },
  { label: 'Fecha', key: 'date' },
  { label: 'Punto de Venta', key: 'point' },
  { label: 'Numero', key: 'number' },
  { label: 'Destinatario', key: 'dest' },
  { label: 'Total', key: 'total' }
];

const getCSVData = facturas => {
  return facturas && facturas.map(f => {
    const dest = get(facturas.find((x) => x.id === f.destinatario), 'perfil.nombre', 'Sin propietario');
    const total = facturas.creditos.reduce((acc, val) => acc + Number(val.monto), 0);

    return {
      key: f.id,
      date: f.fecha_operacion,
      point: f.receipt.point_of_sales,
      number: f.receipt.receipt_number,
      dest,
      total
    }
  });
};

const RecibosXSteps = memo(({ facturas, clientes }) => {
  const dispatch = useDispatch();
  const [table, setTable] = React.useState(false);
  const [fields, setFields] = React.useState(initialFields);
  const [puntos] = usePuntosDeVenta();
  const ref = React.useRef(null);

  const handleSearch = React.useCallback(async (event) => {
    event.preventDefault();
    const response = await dispatch(facturasActions.get(
      facturasActions.FACTURAS_TYPES.factura_c,
      fields
    ));

    if (!response || !Array.isArray(response.results) || response.results.length === 0) return;

    setTable(true);
  }, [dispatch, fields]);

  const handleChange = React.useCallback((key) => {
    return (event) => {
      const value = event.target.value;

      setFields(old => ({
        ...old,
        [key]: value
      }))
    };
  }, [setFields]);

  if (!table) {
    return (
      <Form className="registration__filters" onSubmit={handleSearch}>
        <FormGroup>
          <Label>Numero de factura</Label>
          <Input
            value={fields.id}
            placeholder="#12345"
            label="Numero de factura"
            onChange={handleChange('id')} />
        </FormGroup>

        <FormGroup>
          <Label>Punto de venta</Label>

          <Input type="select" name="select" onChange={handleChange('points')}>
            <option value=''>---</option>
            {puntos.map((punto, i) => (
              <option key={i} value={punto.number}>{punto.number}</option>
            ))}
          </Input>
        </FormGroup>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Desde</Label>
              <Input
                type="date"
                name="start_date"
                placeholder="Fecha desde"
                onChange={handleChange('startDate')}
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>Hasta</Label>
              <Input
                type="date"
                name="end_date"
                placeholder="Fecha hasta"
                onChange={handleChange('endDate')}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit" color="primary">
          Buscar
        </Button>
      </Form>
    );
  }

  return (
    <div className="registration__results">
      <div className="registration__actions">
        <ReactToPrint
          trigger={() => <Button outline disabled={!facturas.length}>Imprimir</Button>}
          content={() => ref.current}
        />


        <CSVLink
          data={getCSVData(facturas)}
          headers={headers}
          className="btn btn-primary"
          target="_blank"
          filename="adminsmart-ops.csv">
          Excel
        </CSVLink>
      </div>

      <RecibosTable facturas={facturas} clientes={clientes} ref={ref} />
    </div>
  );
});

class RecibosTable extends React.Component {
  render () {
    return (
      <Table responsive borderless>
        <thead>
          <tr>
            {headers.map(h => (
              <th>{h.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {this.props.facturas.map((documento) => {
            const destinatario = get(this.props.clientes.find((x) => x.id === documento.destinatario), 'perfil.nombre', 'Sin propietario');

            return (
              <tr key={documento.id}>
                <td>{documento.id}</td>
                <td>{documento.fecha_operacion}</td>
                <td>{documento.receipt.point_of_sales}</td>
                <td>{documento.receipt.receipt_number}</td>
                <td>{destinatario}</td>
                <td>{documento.creditos.reduce((acc, val) => acc + Number(val.monto), 0)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };
};

const mapStateToProps = (state) => ({
  clientes: get(state, 'clientes.list', []),
  facturas: get(state, 'facturas.list.54.results', [])
});

export default connect(mapStateToProps)(RecibosXSteps);

