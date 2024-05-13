const selected = (state = null, action) => {
    switch (action.type) {
      case 'SELECT_CLIENTE':
        return action.payload;

      case 'POST_CLIENTE':
        return action.payload;
      default:
        return state
    }
  }

  export default selected