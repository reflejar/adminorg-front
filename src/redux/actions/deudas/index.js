import { Service } from '../../services/general';

const apiEndpoint = 'operative/estados/deudas';

const get = (params) => async (dispatch) => {
  let path = `${apiEndpoint}/${params.destinatario}/?end_date=${params.fecha}`;
  path = path + "&condonacion=1";

  const response = await Service.get(path);
  if (response && response.data) {
    if (params.save) {
      dispatch({
        type: 'GET_DEUDAS',
        payload: response.data.data
      })
    }
    return response.data
  }
};

export const deudasActions = {
  get
};
