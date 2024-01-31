import React from "react";

import { useIngresos, useIntereses, useDescuentos } from '@/utility/hooks/dispatchers';
import Table from "@/components/board/tables/parametro"
import get from 'lodash/get';
import Spinner from "@/components/spinner/spinner";


const TableIngreso = ({toggle, setItem}) => {
  
  const [items, loadingItems] = useIngresos();
  const [descuentos, loadingDescuentos] = useDescuentos();
  const [intereses, loadingIntereses] = useIntereses();


  const titles = [
    {
      accessor: 'nombre',
      Header: 'Nombre'
    },
    {
      id: 'Metodo de descuento',
      accessor: (d) => get(descuentos.find((x) => d.descuento === x.id), 'full_name', 'S/M'),
      Header: 'Metodo de descuento'
    },
    {
      id: 'Metodo de interes',
      accessor: (d) => get(intereses.find((x) => d.interes === x.id), 'full_name', 'S/M'),
      Header: 'Metodo de interes'
    },
  ]
  if (loadingDescuentos || loadingIntereses) {
    return <Spinner />
  }

  return (
      <Table
        titles={titles}
        items={items}
        loadingItems={loadingItems || loadingDescuentos || loadingIntereses}
        toggle={toggle}
        selectItem={setItem}
        causante={"ingreso"}
      />

  )
}


export default TableIngreso
