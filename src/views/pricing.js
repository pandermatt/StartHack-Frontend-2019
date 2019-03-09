import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { PricingCard, Text } from 'react-native-elements';

class Pricing extends Component {
  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.hero}>
          <Icon color="white" name="games" size={62} />
          <Text style={styles.heading}>Pricing</Text>
        </View>
        <PricingCard
          color={colors.primary}
          title="Starter"
          price="$500"
          info={['10 days / month', 'withouth fuel']}
          button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
          onButtonPress={() => addSubscription("subs1")}
        />
        <PricingCard
          color={colors.secondary}
          title="Basic"
          price="$800"
          info={['20 days / month', 'withouth fuel']}
          button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
          onButtonPress={() => addSubscription("subs2")}
        />
        <PricingCard
          color={colors.secondary2}
          title="Umlimited"
          price="$1000"
          info={['unlimited days / month', 'withouth fuel']}
          button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
          onButtonPress={() => addSubscription("subs3")}
        />
      </ScrollView>
    );
  }
}

Pricing.navigationOptions = {
  title: 'Pricing',
};

function addSubscription(title) {
  fetch('http://130.82.237.49:8000/subscription', {
      method: 'POST',
      body: JSON.stringify({
        subscription: title,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
};

const styles = StyleSheet.create({
  hero: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: colors.primary2,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : null,
    color: '#27ae60',
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
    color: '#34495e',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Pricing;
