import { combineReducers} from 'redux';
import aboutReducer from './aboutReducer';
import sitesReducer from './sitesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers(
    {
        about: aboutReducer,
        sites: sitesReducer, 
        auth: authReducer
    });

export default rootReducer;



