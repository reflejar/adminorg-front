const select = (id) => ({
    type: 'SELECT_PARAMETRO',
    id
})

const get_all = () => async (dispatch) => {
    const payload = [
      {id: "",full_name: "Area Relaciones Humanas"},
      {id: "cliente",full_name: "Clientes y Socios"},
      {id: "proveedor",full_name: "Proveedores"},
      {id: "",full_name: "Area Economica"},
      {id: "caja",full_name: "Tesorería"},
      {id: "ingreso",full_name: "Ingresos"},
      {id: "gasto",full_name: "Gastos"},
      {id: "interes",full_name: "Metodologia de Intereses"},
      {id: "descuento",full_name: "Metodologia de Descuentos"},
      {id: "",full_name: "Area Contable"},
      {id: "titulo",full_name: "Cuentas y titulos contables"},
    ]

    dispatch({
        type: 'GET_PARAMETROS',
        payload: payload
    });
}


export const configuracionesActions = {
    get_all,
    select,
}
