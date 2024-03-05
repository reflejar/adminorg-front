import React, { Component, useState } from "react";
import BasicModal from '@/components/modal';

import Documentos from "@/components/CRUDL/comprobante/L";
import CHOICES from "@/components/CRUDL/comprobante/components/choices";

export default function Modal () {

  const [modal, setModal] = useState(false)

  const handleToggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <BasicModal
        open={modal}
        onToggle={handleToggle}
        button={(<button className="btn btn-outline-danger mx-1 shadow" onClick={handleToggle}> Registros </button>)}
        header="Registros"
        component={<Documentos causante={"titulo"} documentosTypes={CHOICES.receiptTypes['titulo']} />}
        footer={false}
      />
    </>
  );
}