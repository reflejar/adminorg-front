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

// import Cuenta from './cuenta';

import Info from "@/components/CRUDL/titulo/CU";

// import ClienteOptions from './opciones';

function Contenido(props) {

    const [activeTab, setActiveTab] = useState("1");
    const { selected } = props;

    return (<div className="col-lg-7 bg-light min-vh-100">
              <section className="monitor-head pt-3 px-4">
                <Nav tabs>
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
                        Movimientos
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
                        }}>
                        Informacion del titulo
                    </NavLink>
                    </NavItem>
                </Nav>
              </section>

            <section className="monitor-body bg-white p-3">
                <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    {/* { selected ? <Cuenta selected={selected} Table={CuentaTable} /> : "Por favor seleccione" } */}
                </TabPane>
                <TabPane tabId="2">
                    { selected ? <Info selected={selected} /> : "Por favor seleccione" }
                </TabPane>
                </TabContent>
            </section>
            <section className="monitor-footer p-3">
                {/* <ClienteOptions />       */}
            </section>
      </div>
    )
  }
  
const mapStateToProps = state => ({
    selected: get(state, 'contabilidad.instance', {}),
})

export default connect(mapStateToProps, null)(Contenido);