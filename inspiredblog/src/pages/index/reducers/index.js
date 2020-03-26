import { combineReducers} from 'redux';
import aboutReducer from './aboutReducer';
import sitesReducer from './sitesReducer';
import authReducer from './authReducer';
import blogReducer from './blogReducer';

const rootReducer = combineReducers(
    {
        about: aboutReducer,
        sites: sitesReducer, 
        auth: authReducer,
        blog: blogReducer,
    });

export default rootReducer;



