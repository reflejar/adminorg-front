"use client"

import { connect } from 'react-redux'
import { analisisActions } from "@/redux/actions/analisis";

function Botonera({analizar,agrupar_por,encolumnar,totalizar,setAnalizar, setAgrupar, setColumnas, setTotalizar}) {
    

    const handleSeleccion = (event) => {
      const opciones = event.target.options;
      const seleccionados = [];
      for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].selected) {
          seleccionados.push(opciones[i].value);
        }
      }
      setAnalizar(seleccionados)
    };


    return (<div className="col-lg-2 min-vh-100 pe-3">
              <div className="monitor-head p-3 d-flex align-items-center">
                <div className="d-flex justify-content-center align-items-center text-dark "></div>
              </div>
              <div className="monitor-body-without-footer text-end p-3 bg-white">
                <label className='mt-3' htmlFor="analizar">Analizar</label>
                <select type="select" className='form-select' multiple name='analizar' onChange={handleSeleccion}>
                  <option selected={analizar.indexOf('cliente') >= 0} value="cliente">Clientes</option>
                  <option selected={analizar.indexOf('proveedor') >= 0} value="proveedor">Proveedores</option>
                  <option selected={analizar.indexOf('caja') >= 0} value="caja">Tesorería</option>
                  <option selected={analizar.indexOf('ingreso') >= 0} value="ingreso">Ingresos</option>
                  <option selected={analizar.indexOf('gasto') >= 0} value="gasto">Gastos</option>
                  <option selected={analizar.indexOf('titulo') >= 0} value="titulo">Títulos contables</option>
                </select>
                <label className='mt-3' htmlFor="agrupar_por">Agrupar</label>
                <select type="select" className='form-select' name='agrupar_por' onChange={(e) => setAgrupar(e.target.value)}>
                <option value="">---</option>
                  <option selected={agrupar_por === 'concepto'} value="concepto">Conceptos</option>
                  <option selected={agrupar_por === 'proyecto'} value="proyecto">Proyectos</option>
                </select>
                <label className='mt-3' htmlFor="encolumnar">Columnas</label>
                <select type="select" className='form-select' name='encolumnar' onChange={(e) => setColumnas(e.target.value)}>
                  <option value="">---</option>
                  <option selected={encolumnar === 'periodo'} value="periodo">Período</option>
                </select>
                <label className='mt-3' htmlFor="totalizar">Totalizar</label>
                <select type="select" className='form-select' name='totalizar' onChange={(e) => setTotalizar(e.target.value)}>
                  <option>---</option>
                  <option selected={totalizar === 'valor'} value="valor">Saldos</option>
                  <option selected={totalizar === 'cantidad'} value="cantidad">Cantidades</option>
                </select>                                
              </div>
            </div>)
  }


const mapStateToProps = state => ({
  analizar: state.analisis.analizar,
  agrupar_por: state.analisis.agrupar_por,
  encolumnar: state.analisis.encolumnar,
  totalizar: state.analisis.totalizar,
})

const mapDispatchToProps = (dispatch) => ({
  setAnalizar: payload => dispatch(analisisActions.selectAnalizar(payload)),
  setAgrupar: payload => dispatch(analisisActions.selectAgrupar(payload)),
  setColumnas: payload => dispatch(analisisActions.selectColumnas(payload)),
  setTotalizar: payload => dispatch(analisisActions.selectTotalizar(payload))

});
  
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Botonera)
    
    