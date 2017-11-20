import * as types from '../types';

export const fetchDeck = (deck) => ({
    type: types.FETCH_DECK,
    deck
})

export const addCard = (card) => ({
    type: types.ADD_CARD,
    card
})