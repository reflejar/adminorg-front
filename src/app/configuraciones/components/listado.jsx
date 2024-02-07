"use client"

import { useEffect } from 'react';
import { connect } from 'react-redux'
import { configuracionesActions } from "@/redux/actions/configuraciones";

function Listado({items, instance, getItems, setSelectedObject}) {

    useEffect(()=> {
      getItems()
    }, [])

    return (<div className="col-lg-2 min-vh-100 bg-light">
              <div className="monitor-head bg-white">
              </div>
              <div className="monitor-body-without-footer p-3 bg-white">
              <table className="table table-sm">
                  <tbody>
                    {items && items.map((item,key) => (
                      <tr 
                        className={(instance && instance.id === item.id) ? "table-primary" : ""} 
                        onClick={() => {item.id && setSelectedObject(item)}}
                        key={key}
                      >
                        <td className={`${item.id ? "pointer" : 'bg-secondary text-white' }`}>
                          {!item.id && <i className='bi-chevron-down' />} {item.full_name}
                        </td>  
                      </tr>                
                    ))}
                  </tbody>
                </table>    
              </div>
            </div>)
  }


const mapStateToProps = (state) => ({
  items: state.configuraciones.list,
  instance: state.configuraciones.instance
});

const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(configuracionesActions.get_all()),
  setSelectedObject: payload => dispatch(configuracionesActions.select(payload))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Listado)
  
  