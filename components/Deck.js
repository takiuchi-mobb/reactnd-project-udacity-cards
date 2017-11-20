import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { commonStyles, deckStyles } from '../utils/stylesheet';

import * as types from '../types';
import * as deckActions from '../actions/deck';


class Deck extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title
    })

    startQuiz = () => { 
        if (this.props.deck.questions.length === 0) {
            alert("You have no card. Please create cards before doing a quiz!")
            return
        }
        this.props.navigation.navigate('Quiz')
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        const { fetchDeck } = this.props;
        AsyncStorage.getItem(types.UDACITY_CARDS_DECKS).then(JSON.parse).then(data => {
            fetchDeck({
                id: params.id,
                title: params.title,
                questions: data[params.id].questions
            })
        })
    }
    componentWillUnmount() {
        this.props.fetchDeck({});
    }
    render() {
        const { deck, navigation } = this.props;
        return (
            <View style={[commonStyles.container, { justifyContent: 'space-around' }]} >
                <View>
                    <Text style={deckStyles.title}>{deck.title}</Text>
                    <Text style={deckStyles.cards}>{deck.questions && deck.questions.length} cards</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Add_Card', { id: deck.id })}>
                        <Text style={commonStyles.button}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.startQuiz}>
                        <Text style={commonStyles.button}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps({ deck }) {
    return {
        deck: deck.deck
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDeck: deck => dispatch(deckActions.fetchDeck(deck))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);