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

export default class Driving extends React.Component {

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

  fuelCar() {
    console.log('fuel car');
    fetch('http://130.82.239.40:8000/reduction', {
    //fetch('http://130.82.236.131:8000/reduction', {
      method: 'POST',
      body: JSON.stringify({
        clean: 0,
        fueled: 1,
      }),
    }).then((response) => {
      console.log('fueling done');
      console.log(response);
    })
      .catch((error) => {
        console.error(error);
      });
  }

  cleanCar() {
    console.log('clean car');
    fetch('http://130.82.239.40:8000/reduction', {
    //fetch('http://130.82.236.131:8000/reduction', {
      method: 'POST',
      body: JSON.stringify({
        clean: 1,
        fueled: 0,
      }),
    }).then((response) => {
      console.log('cleaning done');
      console.log(response);
    })
      .catch((error) => {
        console.error(error);
      });
  }

  returnCar() {
    this.props.navigation.navigate('Score');
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
              <Text style={styles.nameHeader}>Drive</Text>
            </View>
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
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
                <Button
                  title="+ fueled"
                  buttonStyle={{
                    height: 50,
                    width: 200,
                    backgroundColor: 'rgba(0, 128, 0, 1)',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: 40,
                    marginBottom: 40,
                  }}
                  titleStyle={{
                    fontFamily: 'regular',
                    fontSize: 20,
                    color: 'white',
                  }}
                  onPress={() => this.fuelCar()}
                  underlayColor="transparent"
                />
                <Button
                  title="+ cleaned"
                  buttonStyle={{
                    height: 50,
                    width: 200,
                    backgroundColor: 'rgba(0, 128, 0, 1)',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginBottom: 40,
                  }}
                  titleStyle={{
                    fontFamily: 'regular',
                    fontSize: 20,
                    color: 'white',
                  }}
                  onPress={() => this.cleanCar()}
                  underlayColor="transparent"
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  borderRadius: 5,
                  alignItems: 'center',
                  marginHorizontal: 10,
                  height: 100,
                  marginTop: 30,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
              <Button
                title="End Rental Period"
                buttonStyle={{
                  height: 50,
                  width: 300,
                  backgroundColor: 'rgba(0, 100, 0, 1)',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
                titleStyle={{
                  fontFamily: 'regular',
                  fontSize: 20,
                  color: 'white',
                }}
                onPress={() => this.returnCar()}
                underlayColor="transparent"
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
      marginTop: 30,
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
  })
;
