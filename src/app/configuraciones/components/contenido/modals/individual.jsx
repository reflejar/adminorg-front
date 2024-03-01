import React, { useState } from "react";

import BasicModal from '@/components/modal';

import Cliente from "@/components/CRUDL/cliente/CU";
import Proveedor from "@/components/CRUDL/proveedor/CU";
import Caja from "@/components/CRUDL/caja/CU";
import Ingreso from "@/components/CRUDL/ingreso/CU";
import Gasto from "@/components/CRUDL/gasto/CU";
import Interes from "@/components/CRUDL/interes/CU";
import Descuento from "@/components/CRUDL/descuento/CU";
import Titulo from "@/components/CRUDL/titulo/CU";

export default function Modal ({selected}) {

  const [modal, setModal] = useState(false)

  const handleToggle = () => {
    setModal(!modal);
  };

  const modals = {
    cliente: <Cliente onClose={handleToggle} />,
    proveedor: <Proveedor onClose={handleToggle} />,
    caja: <Caja onClose={handleToggle} />,
    ingreso: <Ingreso onClose={handleToggle} />,
    gasto: <Gasto onClose={handleToggle} />,
    interes: <Interes onClose={handleToggle} />,
    descuento: <Descuento onClose={handleToggle} />,
    titulo: <Titulo onClose={handleToggle} />,      
  }

  return (
    <>
      <BasicModal
        open={modal}
        onToggle={handleToggle}
        button={(<button className="btn btn-outline-primary mx-1 shadow" disabled={!selected} onClick={handleToggle}>Nuevo</button>)}
        header="Nuevo"
        component={selected && modals[selected.id]}
        footer={false}
      />
    </>
  );
}

