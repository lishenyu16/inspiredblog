import { combineReducers} from 'redux';
import aboutReducer from './aboutReducer';
import sitesReducer from './sitesReducer';
import authReducer from './authReducer';
import blogReducer from './blogReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers(
    {
        about: aboutReducer,
        sites: sitesReducer, 
        auth: authReducer,
        blog: blogReducer,
        profile: profileReducer,
    });

export default rootReducer;



