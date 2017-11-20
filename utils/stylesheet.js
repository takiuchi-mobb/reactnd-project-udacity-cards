import { StyleSheet } from 'react-native';
import { gray, black, white } from './colors';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 46,
        textAlign: 'center',
        padding: 16,
        marginBottom: 8
    },
    button: {
        color: white,
        backgroundColor: black,
        textAlign: 'center',
        alignSelf: 'center',
        height: 32,
        marginTop: 12,
        fontSize: 18,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5
    },
    textInput: {
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        margin: 12,
        padding: 8,
        borderStyle: 'solid',
        fontSize: 18
    }
});

export const quizStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around', 
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        textAlign: 'center'
    }
});


export const decksStyles = StyleSheet.create({
    list: {
        height: 160,
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white
    },
    item: {
        fontSize: 24
    },
    count: {
        color: gray
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    empty: {
        fontSize: 32,
        textAlign: 'center'
    }
})

export const deckStyles = StyleSheet.create({
    title: {
        fontSize: 36,
        textAlign: 'center'
    },
    cards: {
        fontSize: 20,
        color: gray,
        textAlign: 'center'
    }
})