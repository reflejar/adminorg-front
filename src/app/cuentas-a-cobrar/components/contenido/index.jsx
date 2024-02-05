'use client'
import { useState } from "react";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
  } from "reactstrap";
import classnames from "classnames";
import { connect } from 'react-redux'
import get from 'lodash/get';

import Deudas from './deudas';
import Cuenta from './cuenta';

import Info from "@/components/CRUDL/cliente/CU";

import ClienteOptions from './opciones';

function Contenido(props) {

    const [activeTab, setActiveTab] = useState("1");
    const { selected } = props;

    return (<div className="col-lg-8 bg-light min-vh-100">
              <section className="monitor-head pt-4 px-4">
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
                <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    { selected ? <Deudas selected={selected}/> : "Por favor seleccione" }
                </TabPane>
                <TabPane tabId="2">
                    { selected ? <Cuenta selected={selected}/> : "Por favor seleccione" }
                </TabPane>
                <TabPane tabId="3">
                    { selected ? <Info selected={selected} /> : "Por favor seleccione" }
                </TabPane>
                </TabContent>
            </section>
            <section className="monitor-footer p-4">
                <ClienteOptions />      
            </section>
      </div>
    )
  }
  
const mapStateToProps = state => ({
selected: get(state, 'clientes.instance', {}),
})

export default connect(mapStateToProps, null)(Contenido);