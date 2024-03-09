const analizar = (state = [], action) => {
    switch (action.type) {
      case 'SELECT_ANALIZAR':
        return action.payload;

      default:
          return state;        
    }
  }

  export default analizar