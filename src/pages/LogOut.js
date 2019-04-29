import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { logOut } from '../Implementation';

import Dialog from "react-native-dialog";



export default class Note extends Component {

    constructor() {
        super();
        this.state = {
            dialog: true,
        }
    }

    mainPage() {
        logOut();
        this.props.navigation.navigate('Login');
    }

    back() {
        this.props.navigation.goBack();
        this.setState({
            dialog : false ,
        })
    }

    render() {
        return (
            <View>
                <Dialog.Container visible={true}>
                    <Dialog.Description>
                        Do you want to logout this account?
                        </Dialog.Description>
                    <Dialog.Button label="no" onPress={() => this.back()} />
                    <Dialog.Button label="Yes" onPress={() => this.mainPage()} />
                </Dialog.Container>
            </View>
        );
    }
}