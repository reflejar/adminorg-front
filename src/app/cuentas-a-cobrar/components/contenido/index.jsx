'use client'
import { useState } from "react";
import { connect } from 'react-redux'
import get from 'lodash/get';

import Deudas from './deudas';
import Cuenta from './cuenta';
import Info from "@/components/CRUDL/cliente/CU";

import ModalComprobante from '../modals/comprobante';
import ModalRegistros from '../modals/registros';

function Contenido({ selected }) {

    const [activeTab, setActiveTab] = useState("deudas");

    const showContent = () => {
        switch (activeTab) {
            case "deudas":
                return <Deudas selected={selected}/>
            case "cuentas":
                return <Cuenta selected={selected}/>
            case "info":
                return <Info selected={selected} />
        }  
    }

    return (<div className="col-lg-8 bg-light min-vh-100">

            <section className="monitor-head pt-3 px-4">
                <ul className="nav nav-tabs" >
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "deudas" && "active"} pointer`}
                            onClick={() => {setActiveTab("deudas");}}
                        >
                            Detalle a cobrar
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "cuentas" && "active"} pointer`}
                            onClick={() => {setActiveTab("cuentas");}}
                        >
                            Cuenta historica
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "info" && "active"} pointer`}
                            onClick={() => {setActiveTab("info");}}
                        >
                            Informacion del cliente
                        </a>
                    </li>
                </ul>
            </section>

            <section className="monitor-body bg-white p-3">
                {selected ? showContent() : "Por favor Seleccione"}
            </section>

            <section className="monitor-footer p-3 d-flex justify-content-between">
                <div className="btn-group">
                    <ModalComprobante selected={selected} />,
                </div>
                <div className="btn-group">
                    <ModalRegistros />
                </div>               
            </section>

      </div>
    )
  }
  
const mapStateToProps = state => ({
    selected: get(state, 'clientes.instance', {}),
})

export default connect(mapStateToProps, null)(Contenido);