import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import shuffleArray from '../utils/shuffleArray';
import { OPEN_TRIVIA } from '../constants/apiEndpoint';
import MainText from './UI/MainText';

export default class Main extends Component {
    state = { currentIndex: 0, questions: [], loading: true, correct: 0, wrong: 0 }

    componentDidMount() {
        this._startGame();
    }

    _refresh = () => {
        this.setState({ currentIndex: 0, questions: [], loading: true, correct: 0, wrong: 0 }, () => this._startGame());
    }

    _startGame = async () => {
        const result = await fetch(OPEN_TRIVIA);
        const json = await result.json();
        this.setState({ questions: json.results, loading: false, timer: performance.now() })
    }

    _confirmSelection = name => {
        const { correct, wrong, currentIndex, questions } = this.state;
        name === questions[currentIndex]['correct_answer'] ?
            this.setState({ correct: correct + 1, currentIndex: currentIndex != questions.length - 1 ? currentIndex + 1 : currentIndex })
            :
            this.setState({ wrong: wrong + 1, currentIndex: currentIndex != questions.length - 1 ? currentIndex + 1 : currentIndex });
    }

    _getColor = () => {
        const { wrong, correct } = this.state;

        if(wrong > correct) {
            return 'rgba(244, 66, 66, 0.3)'
        } else if(correct > wrong) {
            return 'rgba(115, 214, 77, 0.3)'
        } else {
            return 'rgba(67, 143, 219, 0.3)'
        }
    }

    render() {
        const { currentIndex, questions, loading, correct, wrong, timer } = this.state;

        if (loading || !questions) return <ActivityIndicator size='large' />

        const answerArray = questions[currentIndex]['incorrect_answers']
        answerArray.push(questions[currentIndex]['correct_answer']);

        const shuffledArray = shuffleArray([...answerArray]);

        return (
                correct + wrong !== 10 ?
                <View style={styles.container}>
                    <Text style={styles.label}>{questions && decodeURIComponent(questions[currentIndex]['question'])}</Text>
                    {questions && shuffledArray.map((el, index) => {
                        return <TouchableOpacity key={index} style={styles.button} onPress={() => this._confirmSelection(el)}>
                            <Text style={styles.buttonText}>{decodeURIComponent(el)}</Text>
                        </TouchableOpacity>
                    })}
                    <MainText>{`For now you have ${correct} correct answers and ${wrong} incorrect`}</MainText>
                </View>
                :
                <View style={[styles.finalWrapper, { backgroundColor: this._getColor() }]}>
                    <Text style={styles.label}>Thank you for playing!</Text>
                    <MainText>{`Your score is ${correct}`}</MainText>
                    <MainText>{`It took ${((performance.now() - timer)/1000).toFixed(1)} seconds for you to pass this quiz`}</MainText>
                    <Button title='Play Again' onPress={() => this._refresh()}></Button>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    finalWrapper: {
        flex: 1, 
        padding: 15,
        justifyContent: 'center'
    },
    button: {
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    },
    label: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
    },
});