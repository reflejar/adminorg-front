import { Service } from '../../services/general';

let apiEndpoint = 'operative/estados/cuenta';

const get = (params) => async (dispatch) => {
  console.log(params.page)
  let path = `${apiEndpoint}/${params.destinatario}/?end_date=${params.fecha}`;
  if (params.titulo) {
    path = path + `&titulo=${params.titulo}`
  }
  if (params.page) {
    dispatch({
      type: 'SET_PAGE_STATUS_CUENTAS',
      payload: params.page
    });
    path = path + `&page=${params.page}`
  }
  const response = await Service.get(path);
  if (response && response.data) {
    if (params.save) {
      dispatch({
        type: 'GET_STATUS_CUENTAS',
        payload: response.data.data
      });
    }
    return response.data
  }
};

export const cuentasActions = {
  get
};
