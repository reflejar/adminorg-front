import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export const Guardar = ({ handleChange }) => {
  return (
    <>
      <Form className=" d-flex flex-column align-items-start">
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={(e) => handleChange(e, "dataExcel")}
            />
            Datos en Excel
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={(e) => handleChange(e, "infoExcel")}
            />
            Informes en Excel
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={(e) => handleChange(e, "pdfInfo")}
            />
            PDF de Informe
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={(e) => handleChange(e, "pdfGraph")}
            />
            PDF de Gráfico
          </Label>
        </FormGroup>
      </Form>
      <Button outline>Guardar</Button>
    </>
  );
};
