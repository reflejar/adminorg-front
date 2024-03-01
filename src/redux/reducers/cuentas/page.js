const page = (state = 1, action) => {
    switch (action.type) {
        case 'SET_PAGE_STATUS_CUENTAS':
            return action.payload;

        default:
            return state;
    }
}
export default page