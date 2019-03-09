import React from 'react';
import { Text, View, Image, Dimensions, StyleSheet, SafeAreaView, Easing } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


import { Font } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;
let call = 0;

export default class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  static navigationOptions = {
    drawerLabel: () => null,
  };

  nav() {
    console.log(call);
    if (call > 0) {
      console.log('navigate to...');
      this.props.navigation.navigate('Pricing');
    }
    call++;
  }

  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../../assets/fonts/Georgia.ttf'),
      regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
    this.animatedCircularProgress.animate(200, 8000, Easing.exp);
  }


  render() {
    const { navigation } = this.props;
    const finalPicture = navigation.getParam('finalPicture', 'NO-ID');

    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
          <SafeAreaView style={{
            flex: 1, backgroundColor: 'rgba(241,240,241,1)',
          }}>
            <View style={styles.statusBar}/>
            <View style={styles.navBar}>
              <Text style={styles.nameHeader}>We are checking your Information</Text>
            </View>
            <View style={{
              marginTop: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <AnimatedCircularProgress
                style={{ marginBottom: 20 }}
                ref={(ref) => this.animatedCircularProgress = ref}
                size={200}
                width={10}
                fill={100}
                rotation={0}
                tintColor="#00e0ff"
                onAnimationComplete={this.nav.bind(this)}
                backgroundColor="#3d5875"/>
              <Text style={{
                fontSize: 25,
                fontFamily: 'regular',
              }}>Upload in progress</Text>
            </View>
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
