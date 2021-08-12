const initialState = [];

const searchDataReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'CHANGE_TO_SEARCHDATA':
            if (payload.searchData) {
                return payload.searchData;
            }
            break;
        default:
            return state;
    }
}

export default searchDataReducer;