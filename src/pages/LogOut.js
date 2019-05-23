import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { logOut, fbLogout } from '../config/Implementation';

import Dialog from "react-native-dialog";



export default class Note extends Component {

    constructor() {
        super();
        this.state = {
            dialog: true,
        }
    }

    async mainPage() {
        // var user = await AsyncStorage.getItem('data');
        // alert(user);
        // console.log( "user details :"+ user );
        logOut();
        fbLogout();

        AsyncStorage.clear();

        var info = await AsyncStorage.getItem('data');
      //  alert(info);
        console.log("user details :" + info);

        this.props.navigation.navigate('Login');
    }

    back() {
        this.props.navigation.goBack();
        this.setState({
            dialog: false,
        });
    }

    render() {
        return (

            <Dialog.Container visible={this.state.dialog}>
                <Dialog.Description>
                    Do you want to logout this account?
                        </Dialog.Description>
                <Dialog.Button label="no" onPress={() => this.back()} />
                <Dialog.Button label="Yes" onPress={() => this.mainPage()} />
            </Dialog.Container>

        );
    }
}