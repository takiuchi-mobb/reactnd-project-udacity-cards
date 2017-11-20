import * as types from '../types';

export const fetchDecks = (decks) => ({
    type: types.FETCH_DECKS,
    decks
})

export const addDeck = (deck) => ({
    type: types.ADD_DECK,
    deck
})

export const putDeck = (deck) => ({
    type: types.PUT_DECK,
    deck
})