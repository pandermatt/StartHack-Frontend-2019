import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from '../views/login';

const LoginDrawerItem = StackNavigator(
  {
    Playground: { screen: Login },
  },
  {
    headerMode: 'none',
  }
);

LoginDrawerItem.navigationOptions = {
  drawerLabel: 'Log out',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="lock"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default LoginDrawerItem;
