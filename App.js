import React from 'react';
import { registerRootComponent, AppLoading, Asset, Font } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { View, Image, Dimensions } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';

import Pricing from './src/drawer/pricing';
import Login from './src/drawer/login';
import Lists from './src/drawer/lists';
import Rentcar from './src/views/rentcar';
import Upload from './src/views/upload';
import Driving from './src/views/driving';
import Score from './src/views/score';
import MyCamera from './src/views/camera';
import ImageView from './src/views/imageview';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View
      style={{ marginTop: -100, marginBottom: -100, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image
        source={require('./src/images/logo.png')}
        style={{ width: SCREEN_WIDTH * 0.5 }}
        resizeMode="contain"
      />
    </View>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);

const MainRoot = DrawerNavigator(
  {
    Login: {
      path: '/login',
      screen: Login,
    },
    Lists: {
      path: '/lists',
      screen: Lists,
    },
    Pricing: {
      path: '/pricing',
      screen: Pricing,
    },
    Rentcar: {
      path: '/rentcar',
      screen: Rentcar,
    },
    Driving: {
      path: '/driving',
      screen: Driving,
    },
    Score: {
      path: '/score',
      screen: Score,
    },
    MyCamera: {
      path: '/mycamera',
      screen: MyCamera,
    },
    ImageView: {
      path: '/imageview',
      screen: ImageView,
    },
    Upload: {
      path: '/upload',
      screen: Upload,
    },
  },
  {
    initialRouteName: 'Login',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class AppContainer extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/images/bg_screen1.jpg'),
      require('./assets/images/bg_screen2.jpg'),
      require('./assets/images/bg_screen3.jpg'),
      require('./assets/images/bg_screen4.jpg'),
      require('./assets/images/user-cool.png'),
      require('./assets/images/user-hp.png'),
      require('./assets/images/user-student.png'),
      require('./assets/images/avatar1.jpg'),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font, Ionicons.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }

    return <MainRoot />;
  }
}

registerRootComponent(AppContainer);
