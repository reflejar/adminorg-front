import { Service } from '../../services/general';
import get from 'lodash/get';

let apiEndpoint = 'operative/parametros/dominio/';

const search = (term) => ({
    type: 'SEARCH_DOMINIO',
    term
})

const select = (id) => ({
    type: 'SELECT_DOMINIO',
    id
})

const get_all = () => async (dispatch) => {
    const response = await Service.get(apiEndpoint);
    if (response) {    
        const dominios = response.data.results.map(c => {
            let full_name = get(c, 'numero', "");
            return ({...c, full_name})
        }).sort((a, b) => {
            let comparison = 0;
            if (a.numero > b.numero) {
                comparison = 1;
            } else if (a.numero < b.numero) {
                comparison = -1;
            }
            return comparison;
        });

        dispatch({
            type: 'GET_DOMINIOS',
            payload: dominios
        });
    }
}

const send = (values) => async (dispatch) => {


    let payload = {
        titulo: values.titulo,
        nombre: values.nombre,
        numero: values.numero,
        propietario:values.propietario,
        inquilino:values.inquilino,
        domicilio: {
            provincia: values.domicilio_provincia,
            localidad: values.domicilio_localidad,
            calle: values.domicilio_calle,
            numero: values.domicilio_numero,
            piso: values.domicilio_piso,
            oficina: values.domicilio_oficina,
            sector: values.domicilio_sector,
            torre: values.domicilio_torre,
            manzana: values.domicilio_manzana,
            parcela: values.domicilio_parcela,
            catastro: values.domicilio_catastro,
            superficie_total: values.domicilio_superficie_total,
            superficie_cubierta: values.domicilio_superficie_cubierta,
        },
    };

    let response;

    if (values.id) {
        response = await Service.put(apiEndpoint + values.id + "/", payload);
    } else {
        response = await Service.post(apiEndpoint, payload);
    }

    if (response) {
        await dispatch(get_all())
        await dispatch({
            type: 'POST_DOMINIO',
            payload: response.data
        });
        response.result = "success"
    } else {
        response = {
            result: "error"
        }
    }


    return response
};

const send_bulk = (values) => async (dispatch) => {

    let payload = values.map(x => ({
        titulo: x.titulo,
        nombre: x.nombre,
        numero: x.numero,
        propietario:x.propietario,
        inquilino:x.inquilino,
        domicilio: {
            provincia: x.provincia,
            localidad: x.localidad,
            calle: x.calle,
            numero: x.numero_calle,
            piso: x.piso,
            oficina: x.oficina,
            sector: x.sector,
            torre: x.torre,
            manzana: x.manzana,
            parcela: x.parcela,
            catastro: x.catastro,
            superficie_total: x.superficie_total,
            superficie_cubierta: x.superficie_cubierta,
        },
    }))
  
    let response;
    
    response = await Service.post(apiEndpoint, payload);
    if (response) {
      await dispatch(get_all());
      response.result = 'success'
    } else {
      response = {
        result: 'error'
      }
    }
    return response
  };

export const dominiosActions = {
    get_all,
    search,
    select,
    send,
    send_bulk
}
