'use client'
import React, { useCallback } from 'react';
import { 
  connect, 
  // useDispatch 
} from 'react-redux';

// Components
import Spinner from '@/components/spinner/spinner';

import { informesActions } from '@/redux/actions/informes';
import Tipo from '../_campos/tipo';
import Fechas from '../_campos/fechas';
// import Cuentas from '../_campos/cuentas';
// import TiposDocumento from '../_campos/tipos_documento';
import Buttons from '../_campos/buttons';

// Styles
// // import './index.scss';

import { useFiltro } from '../hooks';
import { Analisis } from '../_campos/analisis';

const Reporte = ({ getDataReporte, onClose }) => {
  
  // ToDo: Agregar a este hook de filtro el estado para la seccion de analisis  
  const {filtro, setFiltro, loading, setLoading} = useFiltro();

  // const disableInOptions = ["sys", "rdos", "ecc", "ecp"];
  const checkCondition = () => {
    return filtro.analisis.totalizar && filtro.analisis.totalizar.length > 0
  } 
  

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    
    getDataReporte(filtro)
      .then(() => {
        onClose(false);
      })
      .catch((error) => {
        const { data } = error;
        console.log(data)
      })
      .finally(() => setLoading(false))
  }, [setLoading, getDataReporte, filtro, onClose]);

  if (loading) {
    return (
      <div className='loading-modal'>
        <Spinner />
      </div>
    )
  }

  return (
    <form className='credito-invoice container '  onSubmit={handleSubmit}>
        <Tipo 
          filtro={filtro} 
          setFiltro={setFiltro} />

      <div className="mb-1" style={{overflowX:"hidden", overflowY:"auto", height:"60vh"}}>
        <Fechas 
          filtro={filtro} 
          setFiltro={setFiltro} />
{/* 
        <Cuentas 
          filtro={filtro} 
          setFiltro={setFiltro} 
          disableInOptions={disableInOptions}/>

        <TiposDocumento
          filtro={filtro} 
          setFiltro={setFiltro}
          disableInOptions={disableInOptions}/> */}

        <Analisis
          filtro={filtro} 
          setFiltro={setFiltro}
          title="Análisis de cuentas"
        /> {/* ToDo: Agregar a este hook de filtro el estado para la seccion de analisis   */}
      </div>
      
      <Buttons 
        filtro={filtro}     
        onClose={onClose}
        required={checkCondition()} />

    </form>
  );
};


const mapDispatchToProps = dispatch => ({
  getDataReporte: (payload) => dispatch(informesActions.get_data(payload))
});

export default connect(null, mapDispatchToProps)(Reporte);
