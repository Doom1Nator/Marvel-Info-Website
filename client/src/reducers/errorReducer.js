const initialState = '';

const errorReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'ERROR':
            return payload.error;
        default:
            return state;
    }
}

export default errorReducer;