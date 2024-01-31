'use client'
import React, { useState } from "react";
import { Collapse } from "reactstrap";
import { ArrowDown, ArrowUp } from "react-feather";
import { Guardar } from "../CRUDL/_campos/guardar";
import TableData from "../tables";

const Report = () => {
  const [isOpen, setIsOpen] = useState({
    tabla: true,
    grafico: false,
    guardado: false,
  });
  // const [checked, setChecked] = useState({
  //   dataExcel: false,
  //   infoExcel: false,
  //   pdfInfo: false,
  //   pdfGraph: false,
  // });

  //Controla el acordion
  const toggle = (content) => {
    setIsOpen((prev) => ({...prev, [content]: !isOpen[content]}));
  };


  //Guarda los checkbox seleccionados en el estado checked
  const handleChange = (e, fieldToToggle) => {
    // setChecked((prev) => ({
    //   ...prev,
    //   [fieldToToggle]: e.target.checked,
    // }));
  };

  return (
    <>
      <button
        className="btn h4 btn-lg border container d-flex justify-content-between align-items-center"
        type="button"
        onClick={() => {
          toggle('tabla');
        }}
      >
        Tabla de Resultados
        {isOpen['tabla'] ? <ArrowUp /> : <ArrowDown />}
      </button>
      <Collapse className="container mb-3 position-relative" isOpen={isOpen['tabla']}>
        <TableData />
      </Collapse>
      <button
        className="btn h4 btn-lg border container d-flex justify-content-between align-items-center"
        type="button"
        onClick={() => {
          toggle('grafico');
        }}
      >
        Gáficos
        {isOpen['grafico'] ? <ArrowUp /> : <ArrowDown />}
      </button>
      <Collapse isOpen={isOpen['grafico']}>
        {/* Falta contenido de la opcion Graficos */}
      </Collapse>
      <button
        className="btn h4 btn-lg border container d-flex justify-content-between align-items-center"
        type="button"
        onClick={() => {
          toggle('guardado');
        }}
      >
        Guardar
        {isOpen['guardado'] ? <ArrowUp /> : <ArrowDown />}
      </button>
      <Collapse className="container" isOpen={isOpen['guardado']}>
        <Guardar handleChange={handleChange} />
      </Collapse>
    </>
  );
};

export default Report;
