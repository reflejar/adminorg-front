'use client'
import React, { useEffect } from 'react';
import moment from 'moment';
import { Row, Col } from "reactstrap";

// Components
import Spinner from '@/components/spinner/spinner';

import { AppendableRowField } from '@/components/form/AppendableRowField';
import { mapToOptions } from '@/utility/mappers';

import { useIngresos, useGastos } from '@/utility/hooks/dispatchers';
import { useAppendableField } from '@/components/form/hooks';

const filterCompletedObject = (arr) =>
  arr.filter((x) => (x.cuenta && x.monto > 0));


const ResultadoNew = ({ documento, setDocumento, errors, onlyRead }) => {
  const [ingresos, loadingIngresos] = useIngresos();
  const [gastos, loadingGastos] = useGastos();

  const cleanItem = {
    monto: '',
    detalle: '',
    cuenta: '',
    periodo: moment().format('YYYY-MM-DD'),
  }

  const [
    resultados,
    handleResultadosChange,
    handleResultadosAppend,
    handleResultadosPop,
    setResultado
  ] = useAppendableField(onlyRead ? documento.resultados : [cleanItem], {
    custom: {
      handleChange: (index) => (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const resultado = resultados[index];
        const updatedResultado = { ...resultado, [name]: value };

        setResultado(index, updatedResultado);


      }
    },
    cleanItem
  });

  
  useEffect(() => {
    const updatedResultados = filterCompletedObject(resultados);
    setDocumento((state) => ({
      ...state,
      resultados: updatedResultados
    }));
  }, [resultados, setDocumento])



  if (loadingIngresos || loadingGastos) {
    return (
      <div className='loading-modal'>
        <Spinner />
      </div>
    )
  }

  return (
    <Row>
      <Col sm="12">
        <AppendableRowField
          appendButtonDisabled={onlyRead}
          popButtonDisabled={onlyRead}
          onAppendClick={handleResultadosAppend}
          onPopClick={handleResultadosPop}
          data={resultados}
          errors={errors && errors.resultados}
          fields={[ {
            type: 'select',
            name: 'cuenta',
            placeholder: 'Cuenta',
            header: 'Cuenta',
            disabled: onlyRead,
            handleChange: handleResultadosChange,
            options: (
              <>
                <option defaultValue="">---</option>
                {mapToOptions([...ingresos, ...gastos]).map((ingreso) => (
                  <option key={ingreso.value} value={ingreso.value}>
                    {ingreso.label}
                  </option>
                ))}
              </>
            ),
          }, {
            type: 'date',
            name: 'periodo',
            placeholder: 'Periodo',
            header: 'Periodo',
            disabled: onlyRead,
            handleChange: handleResultadosChange
          }, {
            type: 'text',
            name: 'detalle',
            placeholder: 'Detalle',
            header: 'Detalle',
            disabled: onlyRead,
            handleChange: handleResultadosChange
          }, {
            type: 'number',
            name: 'monto',
            placeholder: 'Monto',
            min: 0,
            header: 'Monto',
            disabled: onlyRead,
            handleChange: handleResultadosChange
          }]}
          header={{
            title: documento.id ? 'Resultados generados' : "Resultados a generar",
            appendButton: '+ deuda'
          }}
        />
      </Col>
    </Row>
  );
};


export default ResultadoNew;