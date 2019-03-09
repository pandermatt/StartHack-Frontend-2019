import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Pricing from '../views/pricing';
import Login from '../views/login';

const PricingDrawerItem = StackNavigator(
  {
    Playground: { screen: Pricing },
  },
  {
    headerMode: 'none',
  }
);

PricingDrawerItem.navigationOptions = {
  drawerLabel: 'Pricing',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="attach-money"
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

export default PricingDrawerItem;
