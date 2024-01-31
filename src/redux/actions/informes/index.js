import { Service } from '../../services/general';
import qs from 'querystring';

let apiEndpoint = 'informes/';

const search = (term) => ({
    type: 'SEARCH_INFORMES',
    term
})

const select = (id) => ({
    type: 'SELECT_INFORMES',
    id
})


const get_data = (params, excel) => async (dispatch) => {

  dispatch({type: 'SET_INFORMES_LOADING',payload: true});
  
  params.fechas.forEach(async f => {
    const query = qs.stringify({
      start_date: f.start_date,
      end_date: f.end_date,
      analisis: JSON.stringify(params.analisis)
    });
    if (excel) {
      Service.getExcel(`${apiEndpoint}xlsx/?${query}`);
    } else {
      const response = await Service.get(apiEndpoint + '?' + query);
      if (response.data) {
        dispatch({
          type: 'GET_INFORMES_DATA',
          payload: response.data
        });
      }

    }

    dispatch({type: 'SET_INFORMES_QUERY', payload: params});
    dispatch({type: 'SET_INFORMES_LOADING',payload: false});      
  });

  dispatch({
    type: 'SET_INFORMES_ALL_FILTERS',
    payload: params
  });


  return;
};




export const informesActions = {
    get_data,
    search,
    select,
}
