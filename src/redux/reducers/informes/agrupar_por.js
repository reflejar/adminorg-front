const agrupar_por = (state = [], action) => {
    switch (action.type) {
      case 'SELECT_AGRUPAR':
        return action.payload;

      default:
          return state;        
    }
  }

  export default agrupar_por