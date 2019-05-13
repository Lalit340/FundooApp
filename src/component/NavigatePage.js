import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginPage from '../pages/Login';
import Dash from '../pages/DashBoard';
import regPage from '../pages/Register';
import Notes from '../pages/SearchNote';
import Drawer from './NavigationDrawer';
import Create from '../pages/CreateNote'
import Display from './CardComponent';
import Edit from '../pages/Edit';
import Edelete from './EditDelete';
import CardPrint from './CardDelete';




const pages = createStackNavigator({
    Login: { screen: LoginPage },
    Dash: { screen: Dash },
    Data: { screen: regPage, navigationOptions: { header: null } },
    Note: { screen: Notes },
    Drawer: { screen: Drawer, navigationOptions: { header: null }, },
    Create: { screen: Create },
    Display: { screen: Display },
    Modify: { screen: Edit },
    CardPrint: { screen: CardPrint },
    Edelete: { screen: Edelete },
   
  
},
    {
        initialRouteName: 'Login',

    });

const Container = createAppContainer(pages);
export default Container;