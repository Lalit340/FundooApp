import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginPage from '../pages/Login';
import Dash from '../pages/DashBoard';
import regPage from '../pages/Register';
import Notes from '../pages/SearchNote';
import Drawer from './NavigationDrawer';
import Create from '../pages/CreateNote'

const pages = createStackNavigator({
    Login: { screen: LoginPage },
    Dash: { screen: Dash },
    Data: { screen: regPage, navigationOptions: { header: null } },
    Note: { screen: Notes },
    Drawer: { screen: Drawer, navigationOptions: { header: null }, },
    Create: { screen: Create },
},
    {
        initialRouteName: 'Login',

    });

const Container = createAppContainer(pages);
export default Container;