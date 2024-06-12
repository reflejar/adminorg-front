// index.js
import { combineReducers } from 'redux';


const instance = (state = null, action) => {
    switch (action.type) {
      case 'SELECT_CAJA':
        return action.id
        
      case 'POST_CAJA':
        return action.payload
      default:
        return state
    }
  }

const list = (state = [], action) => {
    switch (action.type) {

        case 'GET_CAJAS':
            return action.payload;

        default:
            return state;
    }
}

const search = (state = '', action) => {
    switch (action.type) {
      case 'SEARCH_CAJA':
        return action.term
      default:
        return state
    }
}


export default combineReducers({
  instance,
  list,
  search,
});
