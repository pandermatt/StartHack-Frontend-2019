import React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

export default class ImageView extends React.Component {
  render() {
    const { navigation } = this.props;
    const finalPicture = navigation.getParam('finalPicture', 'NO-ID');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
          source={{ uri: finalPicture }}
        />
      </View>
    );
  }
}