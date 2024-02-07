'use client'
import { useState } from "react";
import {
    Nav,
    NavItem,
    NavLink,
  } from "reactstrap";
import classnames from "classnames";
import { connect } from 'react-redux'
import get from 'lodash/get';

import Deudas from './deudas';
import Cuenta from './cuenta';

import Info from "@/components/CRUDL/cliente/CU";

import ModalComprobante from '../modals/factura';
import ModalNotaCredito from '../modals/nota-credito';
import ModalCobro from "../modals/recibo-x";
import ModalComprobanteMasivo from "../modals/factura-masiva";
import ModalPreconceptos from "../modals/preconceptos";
import ModalRegistros from '../modals/registros';

function Contenido({ selected }) {

    const [activeTab, setActiveTab] = useState("1");

    const showContent = () => {
        switch (activeTab) {
            case "1":
                return <Deudas selected={selected}/>
            case "2":
                return <Cuenta selected={selected}/>
            case "3":
                return <Info selected={selected} />
        }  
    }


    return (<div className="col-lg-8 bg-light min-vh-100">

            <section className="monitor-head pt-3 px-4">
                <Nav tabs >
                    <NavItem>
                        <NavLink
                            className={classnames({
                            active: activeTab === "1",
                            pointer: true
                            })}
                            onClick={() => {
                            setActiveTab("1");
                            }}
                        >
                            Detalle a cobrar
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                            active: activeTab === "2",
                            pointer: true
                            })}
                            onClick={() => {
                            setActiveTab("2");
                            }}
                        >
                            Cuenta historica
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                            active: activeTab === "3",
                            pointer: true
                            })}
                            onClick={() => {
                            setActiveTab("3");
                            }}>
                            Informacion del cliente
                        </NavLink>
                    </NavItem>
                </Nav>
            </section>

            <section className="monitor-body bg-white p-3">
                {selected ? showContent() : "Por favor Seleccione"}
            </section>

            <section className="monitor-footer p-3 d-flex justify-content-between">
                <div className="btn-group">
                    <ModalComprobante isDisabled={!selected} />,
                    <ModalNotaCredito isDisabled={!selected} />,
                    <ModalCobro modal={false} isDisabled={!selected} />
                </div>
                <div className="btn-group">
                    <ModalPreconceptos />,
                    <ModalComprobanteMasivo />,
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