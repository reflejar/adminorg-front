import { connect } from 'react-redux'

import Grupo from "./grupo"
import Individual from './modals/individual'
import Masivo from './modals/masivo'

function Contenido({ selected }) {


    return (<div className="col-lg-8 bg-light min-vh-100">

            <section className="monitor-head pt-3 px-4">
                <ul className="nav nav-tabs" >
                    <li className="nav-item">
                        <a className="nav-link active pointer">Listado</a>
                    </li>
                </ul>
            </section>

            <section className="monitor-body bg-white p-3">
                {!selected ? "Por favor seleccione" : <Grupo selected={selected} />}
            </section>

            <section className="monitor-footer p-3 d-flex justify-content-between">
                <div className="btn-group">
                    <Individual selected={selected} />,
                    <Masivo selected={selected} />,
                </div>
                <div className="btn-group">
                    {/* <ModalRegistros /> */}
                </div>               
            </section>

      </div>
    )
  }
  
const mapStateToProps = state => ({
    selected: state.configuraciones.instance,

})

export default connect(mapStateToProps)(Contenido);