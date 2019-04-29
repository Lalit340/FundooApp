
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

import { signinPage, getLogin } from '../Implementation';




class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            user: '',
            pwd: ''
        }

    }

    static navigationOptions = { header: null };

    getSignup() {
        this.props.navigation.navigate('Data');
    }

    signInValidation() {
        var email, pwd;
        email = this.state.user;
        pwd = this.state.pwd;

        if (email.trim() == '')
            alert('enter a valid username');
        else if (email.indexOf('.com') == -1 || email.indexOf('@') == -1)
            alert('enter a valid email');
        else if (pwd.trim() == '')
            alert('Enter  password');
        else if (pwd.length < 8)
            alert('enter a valid password');
        else {
            console.log('login success');
            return true;
        }

    }

    async sign() {
        var validate = this.signInValidation();
        var compare = getLogin(this.state.user, this.state.pwd);
        if (compare) {
            if (validate) {
                var data = signinPage(this.state.user, this.state.pwd);
            }
            if (data) {
                this.props.navigation.navigate('Drawer');
            }
        } else {
            alert('Enter a currect Username & password');
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container1}>
                    <Image
                        style={{ width: 80, height: 70 }}
                        source={require('../Images/f_IMG.jpg')}
                    />

                    <Text style={styles.welcome}>-- Welcome to FundooNotes --</Text>
                </View>

                <TextInput
                    style={styles.textBox}
                    placeholder='enter userId '
                    placeholderTextColor='#ffffff'
                    onChangeText={(user) => this.setState({ user })}
                    value={this.state.user}
                />

                <TextInput
                    style={styles.textBox}
                    placeholder='enter password '
                    placeholderTextColor='#ffffff'
                    secureTextEntry={true}
                    onChangeText={(pwd) => this.setState({ pwd })}
                    value={this.state.pwd}
                />

                <TouchableOpacity >
                    <Text style={styles.textPassword} >Forgotten Password ?</Text>
                </TouchableOpacity>

                <View style={styles.container2}>
                    <TouchableOpacity style={styles.buttonEdit}>
                        <Text style={styles.textEdit} onPress={() => this.sign()}>Signin</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonEdit} onPress={() => { this.getSignup() }} >
                        <Text style={styles.textEdit} >Signup</Text>
                    </TouchableOpacity>
                </View>

            </View>


        );
    }
}


export default LoginPage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#424242',
        alignItems: 'center',

    },
    container1: {
        alignItems: 'center',
        marginVertical: 50,

    },

    welcome: {
        marginVertical: 10,
        fontSize: 20,
        color: 'white',
    },

    textBox: {
        width: 300,
        borderRadius: 20,
        marginVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: 'white',
    },
    container2: {
        flexDirection: 'row',

    },
    buttonEdit: {
        width: 90,
        height: 40,
        marginHorizontal: 40,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(192,192,192,0.5)',
        borderRadius: 10,
    },
    textEdit: {
        fontSize: 20,
        color: 'white',

        textAlign: 'center',

    },

    textPassword: {
        marginVertical: 15,
        color: 'lightgreen',
    },
})
