'use client'
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'

import Spinner from '@/components/spinner';
import Listado from '@/components/listados';
import BasicModal from '@/components/modal';

import { clientesActions } from '@/redux/actions/clientes';
import { proveedoresActions } from '@/redux/actions/proveedores';
import { cajasActions } from '@/redux/actions/cajas';
import { ingresosActions } from '@/redux/actions/ingresos';
import { gastosActions } from '@/redux/actions/gastos';
import { interesesActions } from '@/redux/actions/intereses';
import { titulosActions } from '@/redux/actions/titulos';
import { descuentosActions } from '@/redux/actions/descuentos';


import Cliente from "@/components/CRUDL/cliente/CU";
import Proveedor from "@/components/CRUDL/proveedor/CU";
import Caja from "@/components/CRUDL/caja/CU";
import Ingreso from "@/components/CRUDL/ingreso/CU";
import Gasto from "@/components/CRUDL/gasto/CU";
import Interes from "@/components/CRUDL/interes/CU";
import Descuento from "@/components/CRUDL/descuento/CU";
import Titulo from "@/components/CRUDL/titulo/CU";


function Grupo({ 
    selected, 
    cliente, 
    proveedor,
    caja,
    ingreso,
    gasto,
    interes,
    descuento,
    titulo,
 }) {
    const [modal, setModal] = useState({
        open: false,
        item: null
    });

    const handleModal = (rowInfo) => {
        setModal({
            open: !modal.open,
            item: rowInfo
        });
      };

    const grupos = {
        cliente: {
            action: clientesActions,
            lista: cliente,
            columnas: [
                { label: "Nombre", key: "perfil.nombre"},
                { label: "Apellido", key: "perfil.apellido" },
                { label: "Razon social", key: "perfil.razon_social" },
                { label: "Tipo de documento", key: "perfil.tipo_documento" },
                { label: "Numero", key: "perfil.numero_documento" },
                { label: "Mail", key: "perfil.mail" },
                { label: "Telefono", key: "perfil.telefono" },
                { label: "Editar", key: "", onClick: handleModal},
              ],
            modal: <Cliente selected={modal.item} onClose={handleModal} />
        },
        proveedor: {
            action: proveedoresActions,
            lista: proveedor,
            columnas: [
                { label: "Nombre", key: "perfil.nombre" },
                { label: "Apellido", key: "perfil.apellido" },
                { label: "Razon social", key: "perfil.razon_social" },
                { label: "Tipo de documento", key: "perfil.tipo_documento" },
                { label: "Numero", key: "perfil.numero_documento" },
                { label: "Mail", key: "perfil.mail" },
                { label: "Telefono", key: "perfil.telefono" },
                { label: "Editar", key: "", onClick: handleModal},
              ],
              modal: <Proveedor selected={modal.item} onClose={handleModal} />
        },
        caja: {
            action: cajasActions,
            lista: caja,
            columnas: [
                { label: "Nombre", key: "nombre" },
                { label: "Tipo", key: "taxon" },
                { label: "Editar", key: "", onClick: handleModal},
              ],
              modal: <Caja selected={modal.item} onClose={handleModal} />
        },
        ingreso: {
            action: ingresosActions,
            lista: ingreso,
            columnas: [
                { label: "Nombre", key: "nombre" },
                { label: "Tipo", key: "taxon" },
                { label: "Editar", key: "", onClick: handleModal},
              ],
              modal: <Ingreso selected={modal.item} onClose={handleModal} />
        },
        gasto: {
            action: gastosActions,
            lista: gasto,
            columnas: [
                { label: "Nombre", key: "nombre" },
                { label: "Editar", key: "", onClick: handleModal},
              ],
              modal: <Gasto selected={modal.item} onClose={handleModal} />
        },
        interes: {
            action: interesesActions,
            lista: interes,
            columnas: [
                { label: "Nombre", key: "nombre" },
                { label: "Tipo", key: "taxon" },
                { label: "Editar", key: "", onClick: handleModal},
              ],
              modal: <Interes selected={modal.item} onClose={handleModal} />
        },
        descuento: {
            action: descuentosActions,
            lista: descuento,
            columnas: [
                { label: "Nombre", key: "nombre" },
                { label: "Tipo", key: "taxon" },
                { label: "Editar", key: "", onClick: handleModal},
              ],
              modal: <Descuento selected={modal.item} onClose={handleModal} />
        },        
        titulo: {
            action: titulosActions,
            lista: titulo,
            columnas: [
                { label: "Numero", key: "numero" },
                { label: "Nombre", key: "nombre" },
                { label: "Modulo", key: "predeterminado" },
                { label: "Editar", key: "", onClick: handleModal},
              ],
              modal: <Titulo selected={modal.item} onClose={handleModal} />
        },        
    }

    const grupo = selected && grupos[selected.id]

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const renderModal = () => {
        if (modal.item) {
          return (
              <BasicModal
                open={modal.open}
                onToggle={handleModal}
                header={"Editar"}
                footer={false}
                component={grupo.modal}
              />          
            )
        } 
      }
    
    useEffect(() => {
        const getItems = async () => {
            if (selected) {
                if (grupo.lista.length === 0) {
                    setLoading(true)
                    await dispatch(grupo.action.get_all())
                    setLoading(false)
                }
            }
        }
        getItems()
    }, [selected])

    if (loading) return <Spinner />
    
    else if (grupo && grupo.lista.length > 0) {
        return (<>
                {modal && modal.item && renderModal()}
                <Listado items={grupo.lista} columns={grupo.columnas} />
        </>)
    } else {
        return "No hay items"
    }

  }
  
const mapStateToProps = state => ({
    cliente: state.clientes.list,
    proveedor: state.proveedores.list,
    caja: state.cajas.list,
    ingreso: state.ingresos.list,
    gasto: state.gastos.list,
    interes: state.intereses.list,
    descuento: state.descuentos.list,
    titulo: state.titulos.list,

})

export default connect(mapStateToProps)(Grupo);