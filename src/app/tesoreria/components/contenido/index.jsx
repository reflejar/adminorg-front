'use client'
import { useState } from "react";
import { connect } from 'react-redux'

import Deudas from './tablaDeudas';
import Cuenta from './tablaCuenta';
import Info from "@/components/CRUD/caja/CU";

import ModalComprobante from './modalComprobante';
import ModalRegistros from './modalRegistros';

function Contenido({ selected }) {

    const [activeTab, setActiveTab] = useState("cuentas");

    const showContent = () => {
        switch (activeTab) {
            // case "deudas":
            //     return <Deudas selected={selected}/>
            case "cuentas":
                return <Cuenta selected={selected}/>
            case "info":
                return <Info selected={selected} />
        }  
    }

    return (<div className="col-lg-8  min-vh-100">
            <section className="monitor-head pt-3 px-4">
                <ul className="nav nav-tabs" >
                    {/* <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "deudas" && "active"} ${selected && selected.taxon === "stockeable" ? "pointer" : "disabled"}`}
                            onClick={() => {selected && selected.taxon === "stockeable" && setActiveTab("deudas");}}
                        >
                            Disponible
                        </a>
                    </li> */}
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "cuentas" && "active"} pointer`}
                            onClick={() => {setActiveTab("cuentas");}}
                        >
                            Movimientos
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "info" && "active"} pointer`}
                            onClick={() => {setActiveTab("info");}}
                        >
                            Información de la caja
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
    selected: state.cajas.instance,
})

export default connect(mapStateToProps, null)(Contenido);