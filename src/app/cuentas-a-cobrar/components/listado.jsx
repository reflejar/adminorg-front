"use client"

import { connect } from 'react-redux'
import List from '@/components/board/list'
import { clientesActions } from "@/redux/actions/clientes";
import Search from "@/components/board/search";
import ModalNew from './modal-cliente';


const filterCliente = (items, search) => {
  if(search !== '')
      return items.filter(t => t.full_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  else
      return items
}

const mapStateToPropsFilas = state => ({
  items: filterCliente(state.clientes.list, state.clientes.search),
  instance: state.clientes.instance
})

const mapDispatchToPropsFilas = dispatch => ({
  getItems: () => dispatch(clientesActions.get_all()),
  setSelectedObject: payload => dispatch(clientesActions.select(payload))
})

const Filas = connect(
  mapStateToPropsFilas,
  mapDispatchToPropsFilas
)(List)



const mapStateToPropsBuscador = (state) => ({
  searchTerm: state.clientes.search,
  addNew: <ModalNew />
});

const mapDispatchToPropsBuscador = (dispatch) => ({
  onChange: searchTerm => dispatch(clientesActions.search(searchTerm)),
});

const Buscador = connect(
  mapStateToPropsBuscador,
  mapDispatchToPropsBuscador
)(Search);


export default function Listado() {
    return (<div className="col-lg-2 p-3 min-vh-100">
              <div className="monitor-head">
                <Buscador />
              </div>
              <div className="monitor-body-without-footer pe-2">
                <Filas />
              </div>
            </div>)
  }
  