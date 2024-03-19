const selected = (state = null, action) => {
  switch (action.type) {
    case 'GET_COMPROBANTE':
      return action.payload;
    default:
      return state
  }
}

export default selected