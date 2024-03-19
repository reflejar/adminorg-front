const list = (state = [], action) => {
    switch (action.type) {
        case 'GET_COMPROBANTES':
            return action.payload;
  
        case 'GET_COMPROBANTE':
            return [...state, action.payload];
  
        default:
            return state;
    }
  }
  export default list