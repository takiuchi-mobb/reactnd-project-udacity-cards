import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { commonStyles, quizStyles } from '../utils/stylesheet';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: 'question',
            correct: 0,
            totalCount: this.props.deck.questions.length,
            questions: this.props.deck.questions,
            currentQuestion: this.props.deck.questions[0],
        }
    }

    onClickResult = (isCorrect) => {

        const currentQuestion = this.state.currentQuestion
        const questions = this.state.questions.filter(e => e !== currentQuestion)
        const correct = (isCorrect) ? this.state.correct + 1 : this.state.correct

        this.setState({
            label: 'question',
            currentQuestion: questions[0],
            questions: questions,
            correct: correct
        })

        clearLocalNotification().then(setLocalNotification)
    }

    showCurrentQuestion = () => {
        const { label, questions, currentQuestion } = this.state;
        return (label === 'question') ? currentQuestion.answer : currentQuestion.question
    }

    onFlipQuestionAndAnswer = () => {
        const flipLabel = (this.state.label === 'question') ? 'answer' : 'question';
        this.setState({ label: flipLabel })
    }

    showFlipQuestionAndAnswer = () => {
        const flipLabel = (this.state.label === 'question') ? 'answer' : 'question';
        return 'show ' + flipLabel; 
    }

    reset = () => {
        this.setState({ 
            label: 'question',
            correct: 0,
            questions: this.props.deck.questions, 
            currentQuestion: this.props.deck.questions[0]
            })
    }

    render() {

        ResultView = () => {
            const { correct, totalCount } = this.state;
            const result = Math.floor((correct / totalCount) * 100)
            return (
                <View style={quizStyles.container}>
                    <Text style={quizStyles.title}>You have scored {result}%</Text>
                    <View>
                        <TouchableOpacity onPress={this.reset}>
                            <Text style={commonStyles.button}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Text style={commonStyles.button}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        QuestionView = () => {
            const { label, questions, totalCount } = this.state;
            const currentNumber = (totalCount - questions.length) + 1

            return (<View style={quizStyles.container}>
                        <View>
                            <Text>{currentNumber} / {totalCount}</Text>
                        </View>
                        <View>
                            <Text style={quizStyles.title}>
                                {this.showCurrentQuestion()}
                            </Text>
                            <TouchableOpacity onPress={this.onFlipQuestionAndAnswer}>
                                <Text style={quizStyles.answer}>{this.showFlipQuestionAndAnswer()}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this.onClickResult(true)}>
                                <Text style={[commonStyles.button]}>Correct</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onClickResult(false)}>
                                <Text style={[commonStyles.button]}>Incorrect</Text>
                            </TouchableOpacity>
                        </View>
                </View>)
        }

        return this.state.questions.length > 0 ?  <QuestionView /> : <ResultView />
    }
}

function mapStateToProps({ deck }) {
    return {
        deck: deck.deck
    }
}

export default connect(mapStateToProps, null)(Quiz);