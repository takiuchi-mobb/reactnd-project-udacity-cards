import * as types from '../types';

const initialState = {
    deck: {}
}

function deck(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_DECK:
            return {
                ...state,
                deck: action.deck
            }
        case types.ADD_CARD:
            return {
                ...state,
                deck: {
                    ...state.deck,
                    questions: state.deck.questions.concat([action.card])
                }
            }
        default:
            return state;
    }
}

export default deck;