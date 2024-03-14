const analizar = (state = ['cliente'], action) => {
    switch (action.type) {
      case 'SELECT_ANALIZAR':
        return action.payload;

      default:
          return state;        
    }
  }

  export default analizar