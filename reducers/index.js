import { combineReducers } from 'redux';
// import {categories, category } from './category'
// import {posts, post} from './post'
// import {comments } from './comment'
import decks from './decks';
import deck from './deck';

export default combineReducers({
  decks,
  deck
});
