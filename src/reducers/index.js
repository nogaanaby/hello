//this is the rootReaducer!!!!!
import { combineReducers } from 'redux';
import movieReducer from './movieReducer';

export default combineReducers({
  elements: movieReducer
});