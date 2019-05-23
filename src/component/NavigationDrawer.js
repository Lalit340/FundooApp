import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import DashBoard from '../pages/DashBoard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Log from '../pages/LogOut'
import Deleted from './Delete';
import Archive from './Archive' ;
const drawerNavigator = createDrawerNavigator({
  DashBoard: {
    screen: DashBoard,
  //  screen: (props) => <DashBoard {...props.navigation.state.params} propName={val1} /> ,
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
  }, 
  Delete: {
    screen: Deleted,
    navigationOptions: {
      drawerLabel: 'Deleted',
      drawerIcon: <AntDesign name="delete" size={30} color="green" marginTop='0' />,
    }
  },
  Archive: {
    screen: Archive,
    navigationOptions: {
      drawerLabel: 'Archive',
      drawerIcon: <Foundation  name="archive" size={30} color="green" marginTop='0' />,
    }
  },

},
  {
    initialRouteName: 'DashBoard',
    contentOptions: {
      activeTintColor: "white",
      activeBackgroundColor: '#6d6d6d',
      labelStyle: 'normal',
    },
    drawerPosition: 'left',
    order: ['DashBoard', 'Log' , 'Delete' ,'Archive'],
    // drawerBackgroundColor: 'orange',
  });

const Drawer = createAppContainer(drawerNavigator);

export default Drawer;