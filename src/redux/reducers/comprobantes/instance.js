const selected = (state = null, action) => {
    switch (action.type) {
      case 'SELECT_COMPROBANTE':
        return action.payload;

      case 'POST_COMPROBANTE':
        return action.payload.id;
      default:
        return state
    }
  }

  export default selected