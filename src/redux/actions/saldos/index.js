import { Service } from '../../services/general';

const apiEndpoint = 'operative/estados/saldos';

const get = (params) => async (dispatch) => {
  const path = `${apiEndpoint}/${params.destinatario}/?end_date=${params.fecha}`;

  const response = await Service.get(path);

  
  if (response && response.data) {
    return response.data;

  }
};

export const saldosActions = {
  get
};