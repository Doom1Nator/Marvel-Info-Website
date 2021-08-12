import { combineReducers } from 'redux';
import showingDataReducer from './showingDataReducer';
import searchTermReducer from './searchTermReducer'
import searchDataReducer from './searchDataReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    data: showingDataReducer,
    searchTerm: searchTermReducer,
    searchData: searchDataReducer,
    loading: loadingReducer,
    error: errorReducer
});

export default rootReducer;