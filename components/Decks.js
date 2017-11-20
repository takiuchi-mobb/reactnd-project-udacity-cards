import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

import { connect } from 'react-redux';
import { commonStyles, decksStyles } from '../utils/stylesheet';

import * as types from '../types';
import * as decksActions from '../actions/decks';

class Decks extends Component {

    componentDidMount() {
        const { fetchDecks } = this.props;
        AsyncStorage.getItem(types.UDACITY_CARDS_DECKS).then(JSON.parse).then(data => {
            const result = Object.keys(data).map(key => {
                const {title, questions} = data[key]
                return {
                    id: key,
                    title: title,
                    questions: questions.length
                }
            });
            fetchDecks(result);
        })
    }

    ListView = () => {
        const { decks } = this.props;
        return (
            Object.keys(decks).map((key) => {
              const {id, title, questions} = decks[key]
              return (
                <View key={key}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', { id: id, title: title })}>
                        <View style={decksStyles.list}>
                            <Text style={decksStyles.item}>{title}</Text>
                            <Text style={decksStyles.count}>{questions} cards</Text>
                        </View>
                    </TouchableOpacity>
                </View>
              )
            })
        )
    }

    EmptyView = () => {
        return (
            <View style={decksStyles.container}>
                <Text style={decksStyles.empty}>You have not added any Decks!</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Add_Deck')}>
                    <Text style={commonStyles.button}>Add Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { decks } = this.props;
        const { ListView, EmptyView } = this;
        return (
            <View style={commonStyles.container}>
                {(decks.length === 0 ? <EmptyView /> : <ListView /> )}
            </View>
        )
    }
}

function mapStateToProps({ decks }) {
    return {
        decks: decks.decks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDecks: decks => {
            return dispatch(decksActions.fetchDecks(decks))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks);