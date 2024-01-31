'use client'
import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { Row, Col } from "reactstrap";

// Components
import Spinner from '@/components/spinner/spinner';
import { useDeudas } from '@/utility/hooks/dispatchers';
import { CreditosTable } from "../_campos/tables/creditos";


const filterCompletedObject = (arr) =>
  arr.filter(d => d.checked).map((deuda) => ({
    ...deuda,
    detalle: deuda.detalle,
    monto: deuda.monto,
  }))


const HandleCobros = ({ documento, setDocumento, deudas, errors, onlyRead }) => {
  const getDeudas = useCallback(() => {
    let data = [];
    if (!onlyRead) {
      data = deudas.map((deuda) => ({
        vinculo: deuda.id,
        cuenta: deuda.cuenta,
        concepto: deuda.concepto,
        periodo: moment(deuda.periodo).format('YYYY-MM'),
        detalle: '',
        monto: deuda.saldo,
        max: deuda.saldo,
        checked: false
      }))
    } else {
      if (documento && documento.cobros) {
        data = documento.cobros.map((cobro) => ({
          ...cobro,
          periodo: moment(cobro.origen.periodo).format('YYYY-MM'),
          cuenta: cobro.origen.destinatario,
          concepto: cobro.origen.concepto,
          checked: true
        }))
      }
    }
    return data
  }, [onlyRead, deudas, documento]);
  
  const [selectedDeudas, setSelectedDeudas] = useState(getDeudas());

  
  const handleCreditosTableRowSelect = (index) => {
    let updatedDeudas = [...selectedDeudas];
    updatedDeudas[index].checked = !updatedDeudas[index].checked;
    setSelectedDeudas(updatedDeudas);
  };
  
  
  const handleInputTableChange = (event, index) => {
    let updatedDeudas = [...selectedDeudas];
      
    const name = event.target.name;
    const value = event.target.value;
    const deuda = updatedDeudas[index];
    updatedDeudas[index] = { ...deuda, [name]: name === "monto" ? +value : value };
    
    setSelectedDeudas(updatedDeudas); 
  }; 

  useEffect(() => {
    const updatedDeudas = filterCompletedObject(selectedDeudas);
    setDocumento((state) => ({
      ...state,
      cobros: updatedDeudas
    }));
  }, [selectedDeudas, setDocumento])  

  const deudasFiltradas = selectedDeudas.filter(deuda => deuda.checked === true)
  const totalMonto= deudasFiltradas.reduce( (a, c) => c.monto + a, 0 )
  
  return (
    <Row>
      <Col sm="12">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h3 className="pl-0 credito__row__header__text">
          {documento.id ? 'Items cobrados' : "Items pendientes de cobro"}
        </h3>
        { selectedDeudas.length > 0 ? 
        <h5>Total monto: {totalMonto}</h5> : " "
        }
        </div>
          {
            selectedDeudas.length > 0 ? 
              <CreditosTable
                errors={errors && errors.cobros}
                onlyRead={onlyRead}
                dataTable={selectedDeudas.map((deuda) => ({
                  ...deuda,
                  onRowSelect: handleCreditosTableRowSelect,
                  onInputChange: handleInputTableChange,
              }))}/> :
              <p className="red">--- No existen creditos ---</p>
            }
      </Col>
    </Row>
  );
};


const Cobros = ({ documento, setDocumento, destinatario, errors, onlyRead }) => {
  const [deudas, loadingDeudas] = useDeudas(false, destinatario, documento.fecha_operacion, documento.condonacion);

  return (
    <Row>
      <Col sm="12">
        {loadingDeudas ?
          <div className="loading-modal">
            <Spinner />
          </div>
          :
          <HandleCobros
            documento={documento} 
            setDocumento={setDocumento}
            deudas={deudas}
            errors={errors} 
            onlyRead={onlyRead}/>
          }
      </Col>
    </Row>
  );
};


export default Cobros;
