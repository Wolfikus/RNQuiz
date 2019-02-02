import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import UIStates from './src/constants/uiStates';
import Main from './src/components/Main';
import MainText from './src/components/UI/MainText';

export default class App extends Component {
  state = { questions: [], right: [], wrong: [], uiState: UIStates.start }
  render() {
    const { uiState } = this.state;

    changeToFinish = () => {

    }

    return (
      <View style={styles.container}>
        {uiState === UIStates.start &&
          <>
            <MainText style={{ marginBottom: 7 }}>To get started, please, press the button</MainText>
            <Button title='Start Quiz' onPress={() => this.setState({ uiState: UIStates.inProgress })} />
          </>
        }
        {uiState === UIStates.inProgress &&
          <Main />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
