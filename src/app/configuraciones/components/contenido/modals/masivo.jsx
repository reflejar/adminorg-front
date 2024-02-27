import React, { useState } from "react";

import BasicModal from '@/components/modal/basic';

import Cliente from "@/components/CRUDL/cliente/M";
import Proveedor from "@/components/CRUDL/proveedor/M";
import Caja from "@/components/CRUDL/caja/M";
import Ingreso from "@/components/CRUDL/ingreso/M";
import Gasto from "@/components/CRUDL/gasto/M";

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
    interes: "No es posible realizar importacion de metodologías de interés",
    descuento: "No es posible realizar importacion de metodologías de descuento",
    titulo: "No es posible realizar importacion de los titulos contables"
  }

  return (
    <>
      <BasicModal
        open={modal}
        onToggle={handleToggle}
        button={(<button className="btn btn-outline-primary mx-1 shadow" disabled={!selected} onClick={handleToggle}>Importar</button>)}
        header="Importación"
        component={selected && modals[selected.id]}
        footer={false}
      />
    </>
  );
}

