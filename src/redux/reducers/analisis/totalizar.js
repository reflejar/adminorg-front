const totalizar = (state = 'valor', action) => {
    switch (action.type) {
      case 'SELECT_TOTALIZAR':
        return action.payload;

      default:
          return state;        
    }
  }

  export default totalizar