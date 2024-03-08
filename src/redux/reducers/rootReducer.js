import { combineReducers } from "redux";

import { reducer as toastrReducer } from "react-redux-toastr";

import clientes from './clientes';
import dominios from './dominios';
import proveedores from './proveedores';
import ingresos from './ingresos';
import gastos from './gastos';
import cajas from './cajas';
import intereses from './intereses';
import descuentos from './descuentos';
import configuraciones from './configuraciones';
import contabilidad from './contabilidad';
import titulos from './titulos';
import puntos from './puntos';
import movimientos from './movimientos';
import preconceptos from './preconceptos';
import documentos from './documentos';
import plataforma from './plataforma';
import saldos from './saldos';
import retenciones from './retenciones';
import informes from './informes';
import carpetas from './carpetas';

const appReducer = combineReducers({
   toastr: toastrReducer, // <- Mounted at toastr.
   clientes,
   carpetas,
   dominios,
   informes,
   proveedores,
   ingresos,
   gastos,
   cajas,
   intereses,
   descuentos,
   contabilidad,
   configuraciones,
   titulos,
   puntos,
   movimientos,
   preconceptos,
   documentos,
   plataforma,
   saldos,
   retenciones
});

const rootReducer = (state, action) => {
   return appReducer(state, action);
}

export default rootReducer;
