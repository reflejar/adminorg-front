'use client'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Row, Col, Collapse } from "reactstrap";
import { ArrowDown, ArrowUp } from "react-feather"

// Components
import { AppendableRowField } from '@/components/form/AppendableRowField';

import { useAppendableField } from '@/components/form/hooks';

// const basicErrorMessage = "La suma de los montos a perdonar deben ser estrictamente iguales al la suma del los montos de cada portador.";

const filterCompletedObject = (arr) =>
  arr.filter((x) => (x.end_date));


const Fechas = ({ filtro, setFiltro }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const cleanItem = {
    start_date: "",
    end_date: moment().format('YYYY-MM-DD'),
  }

  const [
    fechas,
    handleFechasChange,
    handleFechasAppend,
    handleFechasPop,
    setFecha
  ] = useAppendableField([cleanItem], {
    custom: {
      handleChange: (index) => (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const fecha = fechas[index];
        const updatedFecha = { ...fecha, [name]: value };

        setFecha(index, updatedFecha);        

      }
    },
    cleanItem
  });

  //Accordion controller
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const updatedFechas = filterCompletedObject(fechas);
    setFiltro((state) => ({
      ...state,
      fechas: updatedFechas
    }));
  }, [fechas, setFiltro])

  return (
    <>
        
      <button 
        className="btn h4 btn-lg btn-primary container d-flex justify-content-between align-items-center"
        type="button"
        onClick={toggle}
        >
        Periodo
        {isOpen ? <ArrowUp /> : <ArrowDown /> }
      </button>
      <Collapse isOpen={isOpen}>
            <Row>
              <Col sm="12">       
                <AppendableRowField
                  appendButtonDisabled={true} // Por ahora se permite un solo periodo
                  popButtonDisabled={true} // Por ahora se permite un solo periodo
                  onAppendClick={handleFechasAppend}
                  onPopClick={handleFechasPop}
                  data={fechas}
                  fields={[{
                    type: 'date',
                    name: 'start_date',
                    placeholder: 'Fecha Inicio',
                    header: 'Fecha Inicio',
                    handleChange: handleFechasChange
                  }, {
                    type: 'date',
                    name: 'end_date',
                    placeholder: 'Fecha Fin',
                    header: 'Fecha Fin',
                    handleChange: handleFechasChange
                  }]}
                  header={{
                    appendButton: '+ periodo'
                  }}
                />
              </Col>
            </Row>
      </Collapse>
    </>
  );
};


export default Fechas;