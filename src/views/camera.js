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

  static navigationOptions = {
    drawerLabel: () => null
}

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    finalPicture: '',
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
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
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontSize: 20, margin: 20, color: 'black' }}>
            {' '}For the next Step, you need to make a picture of your ID{' '}
          </Text>
          <Camera style={{ marginLeft: 20, marginRight: 20, flex: 1 }}
                  ref={(ref) => {
                    this.camera = ref;
                  }}
                  type={this.state.type}>
          </Camera>
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
        </View>
      );
    }
  }
}
