
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,

} from 'react-native';

import { forgotPassword } from '../config/Implementation';
import { TouchableOpacity } from 'react-native-gesture-handler';





export default class Forgot extends Component {

    constructor() {
        super();
        this.state = {
            mail: '',

        }

    }

    static navigationOptions = () => ({
        headerStyle: {
            backgroundColor: '#42a5f5'
        },

    });

    forgot() {
        forgotPassword(this.state.mail);
    }

    render() {
        return (
            <View>
                <View>
                    <Text style={styles.header}> Please enter your email to search for your account </Text>
                    <TextInput
                        style={styles.textEdit}
                        placeholder='Enter your email '
                        placeholderTextColor='#3f51b5'
                        underlineColorAndroid='#3f51b5'
                        onChangeText={(mail) => this.setState({ mail })}
                        value={this.state.mail}
                    />
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => this.forgot()}>
                            <Text style={styles.buttonText}> Search Account </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    textEdit: {
        fontSize: 20,
        color: '#2196f3',
        marginHorizontal: 20,
        width: '90%',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 15,
        color: 'green',
    },
    button: {
        backgroundColor: 'green',
        marginHorizontal: 20,
        marginTop: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    }

})