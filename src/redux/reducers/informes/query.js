const query = (state = {}, action) => {
    switch (action.type) {
      case 'SET_INFORMES_QUERY':
        return action.payload;

      default:
        return state
    }
  }

  export default query