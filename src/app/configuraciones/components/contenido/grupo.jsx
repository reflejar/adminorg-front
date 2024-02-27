'use client'
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'

import Spinner from '@/components/spinner/spinner';
import Listado from '@/components/listados';

import { clientesActions } from '@/redux/actions/clientes';
import { proveedoresActions } from '@/redux/actions/proveedores';
import { cajasActions } from '@/redux/actions/cajas';
import { ingresosActions } from '@/redux/actions/ingresos';
import { gastosActions } from '@/redux/actions/gastos';
import { interesesActions } from '@/redux/actions/intereses';
import { titulosActions } from '@/redux/actions/titulos';
import { descuentosActions } from '@/redux/actions/descuentos';


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

    const grupos = {
        cliente: {
            action: clientesActions,
            lista: cliente,
            columnas: [
                { label: "Nombre", key: "perfil.nombre" },
                { label: "Apellido", key: "perfil.apellido" },
                { label: "Razon social", key: "perfil.razon_social" },
                { label: "Tipo de documento", key: "perfil.tipo_documento" },
                { label: "Numero", key: "perfil.numero_documento" },
                { label: "Mail", key: "perfil.mail" },
                { label: "Telefono", key: "perfil.telefono" },
              ]
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
              ]            
        },
        caja: {
            action: cajasActions,
            lista: caja,
            columnas: [
                { label: "Nombre", key: "nombre" },
                { label: "Tipo", key: "taxon" },
              ]
        },
        ingreso: {
            action: ingresosActions,
            lista: ingreso,
            columnas: [
                { label: "Nombre", key: "nombre" },
                { label: "Tipo", key: "taxon" },
              ]
        },
        gasto: {
            action: gastosActions,
            lista: gasto,
            columnas: [
                { label: "Nombre", key: "nombre" },
              ]
        },
        interes: {
            action: interesesActions,
            lista: interes,
            columnas: [
                { label: "Nombre", key: "nombre" },
                { label: "Tipo", key: "taxon" },
              ]
        },
        descuento: {
            action: descuentosActions,
            lista: descuento,
            columnas: [
                { label: "Nombre", key: "nombre" },
                { label: "Tipo", key: "taxon" },
              ]
        },        
        titulo: {
            action: titulosActions,
            lista: titulo,
            columnas: [
                { label: "Numero", key: "numero" },
                { label: "Nombre", key: "nombre" },
                { label: "Modulo", key: "predeterminado" },
              ]
        },        
    }

    const grupo = selected && grupos[selected.id]

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

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
        return <Listado items={grupo.lista} columns={grupo.columnas} />
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