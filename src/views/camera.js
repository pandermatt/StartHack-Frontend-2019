import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Font, Camera, Permissions } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;


export default class MyCamera extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }


  static navigationOptions = {
    drawerLabel: () => null,
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    finalPicture: '',
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    await Font.loadAsync({
      georgia: require('../../assets/fonts/Georgia.ttf'),
      regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  async snapPhoto() {
    console.log('Button Pressed');
    if (this.camera) {
      console.log('Taking photo');
      const options = {
        quality: 1, base64: true, fixOrientation: true,
        exif: true,
      };
      await this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;
        console.log(photo.uri);
        this.props.navigation.navigate('ImageView', { finalPicture: photo.uri });
      });
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View/>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          {this.state.fontLoaded ? (
            <SafeAreaView
              style={{ flex: 1, backgroundColor: 'rgba(241,240,241,1)' }}
            >
              <View style={styles.statusBar}/>
              <View style={styles.navBar}>
                <Text style={styles.nameHeader}>For the next Step, you need to make a picture of your ID</Text>
              </View>
              <View style={{ height: 500 }}>
                <Camera style={{ marginLeft: 20, marginRight: 20, marginBottom: 20, flex: 1 }}
                        ref={(ref) => {
                          this.camera = ref;
                        }}
                        type={this.state.type}>
                </Camera>
              </View>
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
                title="Take a picture"
                titleStyle={{
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                }}
                onPress={this.snapPhoto.bind(this)}
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
