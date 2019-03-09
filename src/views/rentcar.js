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

export default class ListsScreen1 extends React.Component {
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
    this.setState({chosenDate: newDate})
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

  renderListCards() {
    let tmp = this;
    this.fetchCars().then(function(carsFromApi){
      tmp.setState({cars: carsFromApi})})
      .catch((error) => {
        console.log(error);
      })
    return _.map(this.state.cars, (car, index) => {
      return this.renderCard(car, index);
    });
  }

  fetchCars() {
    return fetch('http://130.82.236.131:8000/cars')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
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
              <Text style={styles.nameHeader}>Growing</Text>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  alignItems: 'center',
                  marginHorizontal: 10,
                  height: 250,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    width: 300,
                    borderWidth: 0.5,
                    borderColor: 'rgba(222, 223, 226, 1)',
                    marginHorizontal: 20,
                    height: 1,
                    marginVertical: 10,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Button
                      title="View Profile"
                      buttonStyle={{
                        height: 33,
                        width: 120,
                        backgroundColor: 'rgba(222, 223, 226, 1)',
                        borderRadius: 5,
                      }}
                      titleStyle={{
                        fontFamily: 'regular',
                        fontSize: 13,
                        color: 'gray',
                      }}
                      onPress={() => console.log('aye')}
                      underlayColor="transparent"
                    />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Button
                      title={this.state.test}
                      buttonStyle={{
                        height: 33,
                        width: 120,
                        backgroundColor: 'rgba(113, 154, 112, 1)',
                        borderRadius: 5,
                      }}
                      titleStyle={{
                        fontFamily: 'regular',
                        fontSize: 13,
                        color: 'white',
                      }}
                      onPress={() => console.log('aye')}
                      underlayColor="transparent"
                    />
                  </View>
                </View>
              </View>
              <View>
                <DatePickerIOS
                  date={this.state.chosenDate}
                  onDateChange={this.setDate}
                />
              </View>
              {this.renderListCards()}
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
