import _ from 'lodash';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';

import { Font } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      cars: [],
      test: "hallo"
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

  renderCard(car, index) {
    const { id, image, name, rented } = car;

    return (
      <View
        key={index}
        style={rented ? {
          height: 95,
          marginHorizontal: 10,
          marginTop: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
          opacity: 0.3,
        } : {
          height: 95,
          marginHorizontal: 10,
          marginTop: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
          opacity: 1,
        }}
      >
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginLeft: 15, backgroundColor: 'white' }}>
            <Avatar
              width={75}
              height={75}
              avatarStyle={{ borderRadius: 75/2, backgroundColor: 'white' }}
              overlayContainerStyle={{ backgroundColor: 'transparent' }}
              source={{
                uri: image,
              }}
              activeOpacity={0.7}
            />
          </View>
          <Text
            style={{
              fontFamily: 'regular',
              fontSize: 15,
              marginLeft: 10,
              color: 'gray',
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {rented ? (
              <Text
                style={{
                  fontFamily: 'regular',
                  fontSize: 15,
                  marginLeft: 10,
                  color: 'gray',
                }}
              >
                not available
              </Text>
            ) : (
            <Button
              title="Rent Car"
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
              onPress={() => this.props.navigation.navigate('Rentcar', {id: id, image: image, name: name })}  //this.rentCar(index, id)}
              underlayColor="transparent"
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: 10,
          }}
        >
        </View>
      </View>
    );
  }

  rentCar(index, id) {
    console.log("wanna rent car number "+ id);
    this.setState({ test: "lol" });
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
    return fetch('http://130.82.239.40:8000/cars')
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
              <Text style={styles.nameHeader}>Rent a Car</Text>
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
                <View style={{ flex: 3, flexDirection: 'row' }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar
                      width={145}
                      height={145}
                      source={{
                        uri:
                          'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
                      }}
                      activeOpacity={0.7}
                      avatarStyle={{ borderRadius: 145 / 2 }}
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
                        Paul Allen
                      </Text>
                    </View>
                  </View>
                </View>
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
