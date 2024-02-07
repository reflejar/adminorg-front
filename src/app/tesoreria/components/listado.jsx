"use client"

import { connect } from 'react-redux'
import List from '@/components/board/list'
import { cajasActions } from "@/redux/actions/cajas";
import Search from "@/components/board/search";
import ModalNew from './modals/caja';

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
  searchTerm: state.cajas.search,
  items: state.cajas.search !== '' ? 
         state.cajas.list.filter(t => t.full_name.toLocaleLowerCase().includes(state.cajas.search.toLocaleLowerCase())) : 
         state.cajas.list,
  instance: state.cajas.instance
});

const mapDispatchToProps = (dispatch) => ({
  searchOnChange: searchTerm => dispatch(cajasActions.search(searchTerm)),
  getItems: () => dispatch(cajasActions.get_all()),
  setSelectedObject: payload => dispatch(cajasActions.select(payload))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Listado)
  
  