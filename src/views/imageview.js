import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class ImageView extends React.Component {

  static navigationOptions = {
    drawerLabel: () => null
}

  async nav() {
    console.log("navigate to...");
    this.props.navigation.navigate('List');
  }

  render() {
    const { navigation } = this.props;
    const finalPicture = navigation.getParam('finalPicture', 'NO-ID');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 100 }}
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
            title="Take a picture"
            titleStyle={{
              fontSize: 20,
              color: 'white',
              textAlign: 'center',
            }}
            onPress={this.nav.bind(this)}
            activeOpacity={0.5}
          />
      </View>
    );
  }
}