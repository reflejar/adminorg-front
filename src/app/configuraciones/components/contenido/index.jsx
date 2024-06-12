'use client'
import { useState } from "react";
import { connect } from 'react-redux'

import Grupo from "./grupo"
import Individual from './modals/individual'
import Masivo from './modals/masivo'

function Contenido({ selected }) {

    const [activeTab, setActiveTab] = useState("habilitados");

    const showContent = () => {
        switch (activeTab) {
            case "habilitados":
                return <Grupo selected={selected} />
            case "deshabilitados":
                return "Nada por aqui"
        }  
    }

    return (<div className="col-lg-8 min-vh-100">

            <section className="monitor-head pt-3 px-4">
                <ul className="nav nav-tabs" >
                <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "habilitados" && "active"} pointer`}
                            onClick={() => {setActiveTab("habilitados");}}
                        >
                            <i className="bi-check-circle-fill text-success" /> Habilitados
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "deshabilitados" && "active"} pointer`}
                            onClick={() => {setActiveTab("deshabilitados");}}
                        >
                            <i className="bi-x-circle-fill text-danger" /> Deshabilitados
                        </a>
                    </li> */}
                </ul>
            </section>

            <section className="monitor-body bg-white p-3">
                {selected ? showContent() : "Por favor Seleccione"}
            </section>

            <section className="monitor-footer p-3 d-flex justify-content-between">
                <div className="btn-group">
                    <Individual selected={selected} />,
                    {/* <Masivo selected={selected} />, */}
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