"use client"

import { connect } from 'react-redux'
import List from '@/components/board/list'
import { proveedoresActions } from "@/redux/actions/proveedores";
import Search from "@/components/board/search";
import ModalNew from './modals/proveedor';

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
  searchTerm: state.proveedores.search,
  items: state.proveedores.search !== '' ? 
         state.proveedores.list.filter(t => t.full_name.toLocaleLowerCase().includes(state.proveedores.search.toLocaleLowerCase())) : 
         state.proveedores.list,
  instance: state.proveedores.instance
});

const mapDispatchToProps = (dispatch) => ({
  searchOnChange: searchTerm => dispatch(proveedoresActions.search(searchTerm)),
  getItems: () => dispatch(proveedoresActions.get_all()),
  setSelectedObject: payload => dispatch(proveedoresActions.select(payload))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Listado)
  
  