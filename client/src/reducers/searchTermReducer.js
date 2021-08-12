const initialState = '';

const searchTermReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'CHANGE_SEARCHTERM':
            if (payload.searchTerm) {
                return payload.searchTerm;
            }
            break;
        case 'RESET_SEARCHTERM':
            return initialState
        default:
            return state;
    }
}

export default searchTermReducer;