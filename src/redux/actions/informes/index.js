import { Service } from "@/redux/services/general";
import moment from "moment";
import qs from 'querystring';

let apiEndpoint = 'reportes/';


const selectAnalizar = (tipos) => ({
    type: 'SELECT_ANALIZAR',
    payload: tipos
})

const selectAgrupar = (tipos) => ({
    type: 'SELECT_AGRUPAR',
    payload: tipos
})

const selectColumnas = (tipo) => ({
    type: 'SELECT_COLUMNAS',
    payload: tipo
})

const selectTotalizar = (tipo) => ({
    type: 'SELECT_TOTALIZAR',
    payload: tipo
})

const fetchData = (params) => async (dispatch) => {
    
    const query = qs.stringify({
        start_date: '',
        end_date: moment(new Date()).format('YYYY-MM-DD'),
        analisis: JSON.stringify(params.analisis)
    })
    const response = await Service.get(apiEndpoint + '?' + query);

    if (response && response.data) {
        return response.data
      }

  
    return;
  };


export const informesActions = {
    selectAnalizar,
    selectAgrupar,
    selectColumnas,
    selectTotalizar,
    fetchData
}
