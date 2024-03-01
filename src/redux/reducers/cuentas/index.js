import { combineReducers } from 'redux';
import list from './list';
import page from './page';

export default combineReducers({
  list,
  page
});
