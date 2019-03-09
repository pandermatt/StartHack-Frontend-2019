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

export default class Rentcar extends React.Component {

  static navigationOptions = {
    drawerLabel: () => null
}

  constructor(props) {
    super(props);

    console.log("Hellloooooo");
    console.log(props);

    this.state = {
      fontLoaded: false,
      //car: {navigation.getParam('finalPicture', 'NO-ID')},
      chosenDate: new Date()
    };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    //this.setState({chosenDate: newDate})
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

  render() {
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <SafeAreaView
            style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}
          >
            <View style={styles.statusBar}/>
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}>Rental Duration</Text>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
              <View>
                <DatePickerIOS
                  date={this.state.chosenDate}
                  onDateChange={this.setDate}
                />
              </View>
              <View>
                <DatePickerIOS
                  date={this.state.chosenDate}
                  onDateChange={this.setDate}
                />
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
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
