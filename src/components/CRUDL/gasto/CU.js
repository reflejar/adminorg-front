'use client'
'use client'
import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup, Label, Button } from 'reactstrap';
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { gastosActions } from '@/redux/actions/gastos';
import { toastr } from "react-redux-toastr";

import { gastos } from '@/utility/options/taxones';
import Spinner from '@/components/spinner/spinner';
import { useTitulos } from '@/utility/hooks/dispatchers';

const empty = 'Campo requerido';

const CU = ({ selected, onClose }) => {
  const dispatch = useDispatch();

  const [titulos, loadingTitulos] = useTitulos();
  const [tituloPred, setTituloPred] = useState();

  useEffect(() => {
    setTituloPred(titulos.find(titulo => titulo.predeterminado === "gasto"))
  }, [titulos])

  if (loadingTitulos) {
    return (
      <div className="loading-modal">
        <br/><br/>
        <Spinner />
      </div>
    )
  }

  if(!tituloPred) {
    return (
      <div className="alert alert-warning text-center">
        Necesita configurar un título contable por defecto para este tipo de cuentas. Por favor dirijase a configuraciones
      </div>
    )
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        nombre: get(selected, 'nombre', ''),
        taxon: get(selected, 'taxon', ''),
        titulo: get(selected, 'titulo', tituloPred.id),
      }}
      validationSchema={Yup.object().shape({
        nombre: Yup.string().required(empty),
        taxon: Yup.string(),
        titulo: Yup.number().required(empty),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          await dispatch(gastosActions.send({ 
            ...values, 
            id: get(selected, 'id', null) 
          })).then(() => {
            toastr.success('¡Listo! Guardado con éxito');
          });
          if (onClose) {
            onClose(false);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, setFieldValue, handleSubmit, isSubmitting, values }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm="12">
              <h4>Datos Principales</h4>
              <FormGroup>
                <Label for="nombre">Nombre</Label>
                <Field name="nombre" id="nombre" className={`form-control ${errors.nombre && touched.nombre && 'is-invalid'}`} />
                {errors.nombre && touched.nombre ? <div className="invalid-feedback">{errors.nombre}</div> : null}
              </FormGroup>
              <FormGroup>
                <Label for="taxon">Tipo de erogacion</Label>
                <Field component="select" name="taxon" id="taxon" className={`form-control ${errors.taxon && touched.taxon && 'is-invalid'}`}>
                  {gastos.map((gasto, i) => {
                    return <option key={i} value={gasto.id}>{gasto.nombre}</option>
                  })}
                </Field>
                {errors.taxon && touched.taxon ? <div className="invalid-feedback">{errors.taxon}</div> : null}
              </FormGroup>    
              <FormGroup>
                <Label for="titulo">Titulo contable</Label>
                <Field value={tituloPred.id} disabled component="select" name="titulo" id="titulo" className={`form-control ${errors.titulo && touched.titulo && 'is-invalid'}`}>
                  <option value={""}> --- </option>
                  {titulos.map((titulo, i) => {
                    return <option key={i} value={titulo.id}>{titulo.nombre}</option>
                  })}
                </Field>
                {errors.titulo && touched.titulo ? <div className="invalid-feedback">{errors.titulo}</div> : null}
              </FormGroup>                             
            </Col>

            <Col xs={12}>
              <hr />
            </Col>
            
                        
          </Row>

          <Button type="submit" color="primary" className="button-clip-loader" disabled={isSubmitting}>
            {isSubmitting && (
              <ClipLoader
                sizeUnit="px"
                size={18}
                color="#FF586B"
              />
            )}

            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CU;
