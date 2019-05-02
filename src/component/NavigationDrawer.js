import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import DashBoard from '../pages/DashBoard';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Log from '../pages/LogOut'

const drawerNavigator = createDrawerNavigator({
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: <AntDesign name="home" size={30} color="green" marginTop='0' />,
    },
  },
  Log: {
    screen: Log,
    navigationOptions: {
      drawerLabel: 'Signout',
      drawerIcon: <AntDesign name="logout" size={30} color="green" marginTop='0' />,
    }
  }

},
  {
    initialRouteName: 'DashBoard',
    contentOptions: {
      activeTintColor: "white",
      activeBackgroundColor: '#6d6d6d',
      labelStyle: 'normal',
    },
    drawerPosition: 'left',
    order: ['DashBoard', 'Log'],
    // drawerBackgroundColor: 'orange',
  });

const Drawer = createAppContainer(drawerNavigator);

export default Drawer;