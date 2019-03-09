import _ from 'lodash';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
  DatePickerIOS,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';

import { Font } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Score extends React.Component {

  static navigationOptions = {
    drawerLabel: () => null,
  };

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../../assets/fonts/Georgia.ttf'),
      regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  getScore() {
    return 34;
  }

  getStats() {
    console.log('get stats');
    fetch('http://130.82.236.131:8000/reduction/', {
      method: 'GET',
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  nextStep() {
    this.props.navigation.navigate('Lists');
  }


  render() {
    //this.getStats();
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <SafeAreaView
            style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}
          >
            <View style={styles.statusBar}/>
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}>Score</Text>
            </View>
            <ScrollView style={{
              flex: 1, marginBottom: 20,
              alignContent: 'center',
            }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  borderRadius: 5,
                  alignItems: 'center',
                  marginHorizontal: 10,
                  height: 300,
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignContent: 'center',
                  backgroundColor: 'white',
                }}>
              <Text style={styles.points}>{this.getScore()}</Text>
              <Text style={styles.pointsBottom}>Points earned</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'regular',
    marginLeft: 20,
  },
  dateHeader: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'regular',
    marginLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  rentButton: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  points: {
    fontSize: 80,
    color: '#005500',
    fontWeight: 'bold',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsBottom: {
    fontSize: 20,
    color: 'black',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
