const selected = (state = null, action) => {
    switch (action.type) {
      case 'SELECT_PROYECTO':
        return action.id
      case 'POST_PROYECTO':
        return action.payload.id
      default:
        return state
    }
  }

  export default selected