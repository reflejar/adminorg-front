const encolumnar = (state = '', action) => {
    switch (action.type) {
      case 'SELECT_COLUMNAS':
        return action.payload;

      default:
          return state;        
    }
  }

  export default encolumnar