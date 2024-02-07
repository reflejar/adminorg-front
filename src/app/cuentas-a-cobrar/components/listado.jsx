"use client"

import { connect } from 'react-redux'
import List from '@/components/board/list'
import { clientesActions } from "@/redux/actions/clientes";
import Search from "@/components/board/search";
import ModalNew from './modals/cliente';

function Listado({searchTerm, searchOnChange, items, instance, getItems, setSelectedObject}) {

    const fetchIfNotExists = () => {
      if (items.length <= 0) {
        getItems()
      }
    }


    return (<div className="col-lg-2 min-vh-100 bg-light">
              <div className="monitor-head p-3 d-flex align-items-center">
                <Search 
                  searchTerm={searchTerm}
                  onChange={searchOnChange}
                  addNew={<ModalNew />}
                />
              </div>
              <div className="monitor-body-without-footer p-3 bg-white">
                <List
                  items={items}
                  instance={instance}
                  getItems={fetchIfNotExists}
                  setSelectedObject={setSelectedObject}
                />
              </div>
            </div>)
  }


const mapStateToProps = (state) => ({
  searchTerm: state.clientes.search,
  items: state.clientes.search !== '' ? 
         state.clientes.list.filter(t => t.full_name.toLocaleLowerCase().includes(state.clientes.search.toLocaleLowerCase())) : 
         state.clientes.list,
  instance: state.clientes.instance
});

const mapDispatchToProps = (dispatch) => ({
  searchOnChange: searchTerm => dispatch(clientesActions.search(searchTerm)),
  getItems: () => dispatch(clientesActions.get_all()),
  setSelectedObject: payload => dispatch(clientesActions.select(payload))

});


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Listado)
  
  