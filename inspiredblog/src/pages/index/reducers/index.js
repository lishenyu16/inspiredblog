import { combineReducers} from 'redux';
import aboutReducer from './aboutReducer';
import sitesReducer from './sitesReducer';

const rootReducer = combineReducers({about: aboutReducer,sites: sitesReducer});

export default rootReducer;



