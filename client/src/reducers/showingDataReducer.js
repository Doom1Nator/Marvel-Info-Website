const initialState = [];

const showingDataReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'CHANGE_DATA':
            if (payload.data) {
                return payload.data;
            }
            break;
        default:
            return state;
    }
}

export default showingDataReducer