const search = (state = '', action) => {
    switch (action.type) {
      case 'SEARCH_GASTO':
        return action.term
      default:
        return state
    }
}

export default search