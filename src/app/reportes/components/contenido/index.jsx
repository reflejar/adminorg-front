'use client'
import Listado from "@/components/listados";
import Spinner from "@/components/spinner";
import { informesActions } from "@/redux/actions/informes";
import { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux'

function Contenido({ analizar,agrupar_por,encolumnar,totalizar }) {

    const [activeTab, setActiveTab] = useState("tabla");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    
    const [data, setData] = useState([]);

    useEffect(() => {
        if (analizar.length > 0 && totalizar !== '') {
            setLoading(true)
            dispatch(informesActions.fetchData({analisis: {analizar, agrupar_por, encolumnar, totalizar}}))
            .then((response) => setData(response))
            .finally(() => setLoading(false));
        }
    }, [analizar,agrupar_por,encolumnar,totalizar])

    return (<div className="col-lg-8  min-vh-100">
            <section className="monitor-head pt-3 px-4">
                <ul className="nav nav-tabs" >
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "tabla" && "active"} pointer`}
                            onClick={() => {selected && setActiveTab("tabla");}}
                        >
                            Reporte
                        </a>
                    </li>
                </ul>
            </section>

            <section className="monitor-body-without-footer bg-white p-3">
                {loading ? <Spinner /> : data.length > 0 ? <Listado items={data} columns={Object.keys(data[0]).map(k => ({key: k, label: k}))} /> : ""}
            </section>

      </div>
    )
  }
  
const mapStateToProps = state => ({
    analizar: state.informes.analizar,
    agrupar_por: state.informes.agrupar_por,
    encolumnar: state.informes.encolumnar,
    totalizar: state.informes.totalizar,
})


export default connect(mapStateToProps, null)(Contenido);