"use client"

function Botonera() {

    return (<div className="col-lg-2 min-vh-100">
              <div className="monitor-head p-3 d-flex align-items-center">
                <div className="d-flex justify-content-center align-items-center text-dark "></div>
              </div>
              <div className="monitor-body-without-footer p-3 bg-white">
                <label className='mt-5' htmlFor="analizar">Analizar</label>
                <select type="select" className='form-select' multiple name='analizar'>
                  <option value="a">a</option>
                  <option value="a">a</option>
                  <option value="a">a</option>
                  <option value="a">a</option>
                </select>
                <label className='mt-5' htmlFor="agrupar">Agrupar</label>
                <select type="select" className='form-select' multiple name='agrupar'>
                  <option value="a">a</option>
                  <option value="a">a</option>
                  <option value="a">a</option>
                  <option value="a">a</option>
                </select>
                <label className='mt-5' htmlFor="encolumnar">Columnas</label>
                <select type="select" className='form-select' name='encolumnar'>
                  <option value="a">a</option>
                  <option value="a">a</option>
                  <option value="a">a</option>
                  <option value="a">a</option>
                </select>
                <label className='mt-5' htmlFor="totalizar">Totalizar</label>
                <select type="select" className='form-select' name='totalizar'>
                  <option value="a">a</option>
                  <option value="a">a</option>
                  <option value="a">a</option>
                  <option value="a">a</option>
                </select>                                
              </div>
            </div>)
  }


export default Botonera
  
  