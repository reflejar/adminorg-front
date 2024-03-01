import React, { useState } from "react";

import BasicModal from '@/components/modal';
import Comprobante from "@/components/CRUDL/comprobante/CU";


export default function Modal ({selected}) {

  const [modal, setModal] = useState(false)

  const handleToggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <BasicModal
        open={modal}
        onToggle={handleToggle}
        button={(<button className="btn btn-outline-primary mx-1 shadow" disabled={!selected} onClick={handleToggle}> + Comprobante </button>)}
        header="Nuevo Comprobante"
        component={<Comprobante moduleHandler={'cliente'} destinatario={selected} onClose={() => handleToggle()}/>}
        footer={false}
      />
    </>
  );
}