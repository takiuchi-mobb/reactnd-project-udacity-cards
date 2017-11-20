import * as types from '../types';

const initialState = {
    decks: []
}

function decks(state = initialState, action) {
    switch (action.type) {

        case types.ADD_DECK:
            return {
                ...state,
                decks: state.decks.concat([action.deck])
            }

        case types.PUT_DECK:
            return {
                ...state,
                decks: state.decks.map(data => (data.id === action.deck.id) ? action.deck : data)
            }

        case types.FETCH_DECKS:

            return {
                ...state,
                decks: action.decks
            }

        default:
            return state;
    }
}

export default decks;