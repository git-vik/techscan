import {combineReducers} from 'redux';
import searchGithubReducer from './searchGithubReducer';

const rootReducer = combineReducers({
	searchGithubReducer: searchGithubReducer
});
export default rootReducer;