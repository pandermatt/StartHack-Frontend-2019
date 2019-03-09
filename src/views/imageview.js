import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';

import { Font } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ImageView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  static navigationOptions = {
    drawerLabel: () => null,
  };

  async nav() {
    console.log('navigate to...');
    this.props.navigation.navigate('Pricing');
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
    const { navigation } = this.props;
    const finalPicture = navigation.getParam('finalPicture', 'NO-ID');

    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}>
            <View style={styles.statusBar}/>
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}>We are checking your Information</Text>
            </View>
            <Image
              style={{
                width: Dimensions.get('window').width - 40,
                height: Dimensions.get('window').height * 0.6,
                margin: 20,
                borderRadius: 20,
              }}
              source={{ uri: finalPicture }}
            />
            <Button
              containerStyle={{ marginVertical: 20 }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonStyle={{
                height: 55,
                width: SCREEN_WIDTH - 40,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              linearGradientProps={{
                colors: ['rgba(214,116,112,1)', 'rgba(233,174,87,1)'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              title="Continue"
              titleStyle={{
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}
              onPress={this.nav.bind(this)}
              activeOpacity={0.5}
            />
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
