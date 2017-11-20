import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { commonStyles } from '../utils/stylesheet';

import * as types from '../types';
import * as deckActions from '../actions/deck';
import * as decksActions from '../actions/decks';

class AddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: ''
        }
    }
    submit = () => {
        const {question, answer} = this.state
        const { state, goBack } = this.props.navigation
        const { addCard, putDeck } = this.props;
        if (question.length === 0 ) {
            alert('Please fill in a question!')
            return
        }

        if ( answer.length === 0) {
            alert('Please fill in an answer!') 
            return 
        }

        const card = {
            question: question,
            answer: answer
        }

        AsyncStorage.getItem(types.UDACITY_CARDS_DECKS).then(JSON.parse).then(data => {
            AsyncStorage.mergeItem(types.UDACITY_CARDS_DECKS, JSON.stringify({
                [state.params.id]: {
                    questions: data[state.params.id].questions.concat([card])
                }
            }))
            return AsyncStorage.getItem(types.UDACITY_CARDS_DECKS) 
        })
        .then(JSON.parse)
        .then(data => {
            addCard(card);
            const deck = data[state.params.id];
            putDeck({
                id: state.params.id,
                title: deck.title,
                questions: deck.questions.length
            });
            goBack();
        });
    }
    render() {
        const { question, answer } = this.state;
        return (
            <View style={commonStyles.container}>
                <TextInput style={commonStyles.textInput}
                    placeholder="Question"
                    value={question}
                    onChangeText={value => this.setState({ question: value })} />
                <TextInput style={commonStyles.textInput}
                    placeholder="Answer"
                    value={answer}
                    onChangeText={value => this.setState({ answer: value })} />
                <TouchableOpacity onPress={this.submit}>
                    <Text style={commonStyles.button}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
      return {
        addCard: card => dispatch(deckActions.addCard(card)),
        putDeck: deck => dispatch(decksActions.putDeck(deck))
      }
}

export default connect(null, mapDispatchToProps)(AddCard);