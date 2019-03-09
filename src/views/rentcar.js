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
import settings from '../config/settings';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Rentcar extends React.Component {

  static navigationOptions = {
    drawerLabel: () => null,
  };

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      car: {
        id: props.navigation.state.params.id,
        image: props.navigation.state.params.image,
        name: props.navigation.state.params.name,
      },
      chosenDate: new Date(),
    };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
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

  rentCar() {
    fetch(settings.apiEndpoint + '/rent/' + this.state.car.id, {
      method: 'POST',
    }).then((response) => {
      this.props.navigation.navigate('Driving', {
        id: this.state.car.id,
        image: this.state.car.image,
        name: this.state.car.name,
      });
    })
      .catch((error) => {
        console.error(error);
      });
  }

  renderCar() {
    const { image, name } = this.state.car;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
          borderRadius: 5,
          alignItems: 'center',
          marginHorizontal: 10,
          height: 170,
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 3, flexDirection: 'row' }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Avatar
              width={150}
              height={150}
              source={{
                uri:
                image,
              }}
              activeOpacity={0.7}
              avatarStyle={{ borderRadius: 150 / 2 }}
              overlayContainerStyle={{ backgroundColor: 'transparent' }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 10,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: 'bold',
                  fontSize: 25,
                  color: 'rgba(98,93,144,1)',
                  marginLeft: -15,
                }}
              >
                {name}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
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
              {this.renderCar()}
              <View>
                <Text style={styles.dateHeader}>Start Date: today</Text>
              </View>
              <View>
                <Text style={styles.dateHeader}>End Date:</Text>
                <DatePickerIOS
                  date={this.state.chosenDate}
                  onDateChange={this.setDate}
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
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Button
                  title="Start driving"
                  buttonStyle={{
                    height: 50,
                    width: 200,
                    backgroundColor: 'rgba(0, 128, 0, 1)',
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
                  onPress={() => this.rentCar()}
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
    },
    dateHeader: {
      color: 'black',
      fontSize: 16,
      fontFamily: 'regular',
      marginLeft: 20,
      marginTop: 20,
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
