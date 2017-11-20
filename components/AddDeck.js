import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { commonStyles } from '../utils/stylesheet';

import * as types from '../types';
import * as deckActions from '../actions/decks';

import uuidv1 from 'uuid/v1'

class AddDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }
    submit = () => {

        const title = this.state.title

        if (title === '') {
            return alert('Please fill in a title!')
        }

        const uuid = uuidv1()
        const params = JSON.stringify({
            [uuid]: {
                title: title,
                questions: []
            }
        })

        AsyncStorage.mergeItem(types.UDACITY_CARDS_DECKS, params).then(() => {
            this.props.addDeck({
                id: uuid,
                title: title,
                questions: 0
            });
            this.setState({ title: '' });
            this.props.navigation.navigate('Deck', { id: uuid, title: title });
        });
    }
    render() {
        return (
            <View style={commonStyles.container}>
                <Text style={commonStyles.title}>What is the title of your new deck?</Text>
                <TextInput placeholder="Deck Title"
                    style={commonStyles.textInput}
                    value={this.state.title}
                    onChangeText={value => this.setState({ title: value })} />
                <TouchableOpacity onPress={this.submit}>
                    <Text style={commonStyles.button}>Create Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
    addDeck: deck => dispatch(deckActions.addDeck(deck))
  }
}

export default connect(null, mapDispatchToProps)(AddDeck);