import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import DashBoard from '../pages/DashBoard';
import Notes from '../pages/SearchNote';
import AntDesign from 'react-native-vector-icons/AntDesign'


const drawerNavigator = createDrawerNavigator({
    DashBoard: { 
        screen: DashBoard,
        navigationOptions : {
          drawerLabel : 'Home',
          drawerIcon :<AntDesign name="home" size={30} color="#004d40" marginTop ='0' />
        },
      },
    Note: {
         screen: Notes ,
         navigationOptions : {
            drawerLabel : 'Notes',
          },
    },
},
    {
        initialRouteName: 'DashBoard',
        contentOptions: {
            activeTintColor: "white",  
            activeBackgroundColor : '#6d6d6d',    
            labelStyle :'normal', 
        },
        drawerPosition: 'left',
        order: ['DashBoard' ,'Note'],
        
       // drawerBackgroundColor: 'orange',
    });

const Drawer = createAppContainer(drawerNavigator);

export default Drawer;