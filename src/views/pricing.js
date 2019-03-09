import React from 'react';
import { Text, View, Dimensions, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import colors from '../config/colors';
import { Font } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;


import { PricingCard } from 'react-native-elements';

export default class Pricing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  static navigationOptions = {
    drawerLabel: () => null,
  };


  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../../assets/fonts/Georgia.ttf'),
      regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  async addSubscription(title) {
    fetch('http://130.82.236.131:8000/subscription', {
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
    this.props.navigation.navigate('Lists');
  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}>
            <ScrollView>
              <View style={styles.statusBar}/>
              <View style={styles.navBar}>
                <Text style={styles.nameHeader}>Pricing</Text>
              </View>
              <PricingCard
                color={colors.primary}
                title="Starter"
                price="$500"
                info={['10 days / month', 'withouth fuel']}
                button={{ title: 'GET STARTED', icon: 'ev-station' }}
                onButtonPress={() => this.addSubscription('subs1')}
              />
              <PricingCard
                color={colors.secondary2}
                title="Basic"
                price="$800"
                info={['20 days / month', 'withouth fuel']}
                button={{ title: 'GET STARTED', icon: 'ev-station' }}
                onButtonPress={() => this.addSubscription('subs2')}
              />
              <PricingCard
                color={colors.secondary3}
                title="Umlimited"
                price="$1000"
                info={['unlimited days / month', 'withouth fuel']}
                button={{ title: 'GET STARTED', icon: 'ev-station' }}
                onButtonPress={() => this.addSubscription('subs3')}
              />
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

