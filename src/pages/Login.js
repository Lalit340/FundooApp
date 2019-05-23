
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    AsyncStorage,
} from 'react-native';

import { signinPage, saveData, fbLogin } from '../config/Implementation';





class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            user: '',
            pwd: '',
            pic: '',
        }

    }

    static navigationOptions = { header: null };

    getSignup() {
        this.props.navigation.navigate('Data');
    }

    password() {
        this.props.navigation.navigate('Forgot');
    }

    signInValidation() {
        var email, pwd;
        email = this.state.user;
        pwd = this.state.pwd;

        if (email.trim() == '')
            alert('enter a valid username');
        else if (email.trim().indexOf('.com') == -1 || email.trim().indexOf('@') == -1)
            alert('enter a valid email');
        else if (pwd.trim() == '')
            alert('Enter  password');
        else if (pwd.trim().length < 8)
            alert('enter a valid password');
        else {
            console.log('validation is good');
            return true;
        }

    }

    loginFb() {

        fbLogin(user => {
            if (user) {
                this.setState({ pic: user.user.photoURL });
                var value = {
                    pic: user.user.photoURL,
                    userName: user.user.displayName,
                }
                AsyncStorage.setItem('FBValue' , JSON.stringify(value));
                
                    console.log(" user photo " + this.state.pic +'  '+ value)
                this.props.navigation.navigate('Drawer', { photo: this.state.pic });

            } else {
                alert('Login Not Success');
            }
        });
    }
  

    async sign() {
        var validate = this.signInValidation();
        await saveData(this.state.user, this.state.pwd);

        if (validate) {
            var data = signinPage(this.state.user, this.state.pwd);
            console.log(' Signin value ' + data);
        }

        if (data) {
            this.props.navigation.navigate('Drawer');
        } else {
            alert('Enter a valid password & email');
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
                    onSubmitEditing={() => this.pwd.focus()}
                    value={this.state.user}
                />

                <TextInput
                    style={styles.textBox}
                    placeholder='enter password '
                    placeholderTextColor='#ffffff'
                    secureTextEntry={true}
                    ref={(input) => this.pwd = input}
                    onChangeText={(pwd) => this.setState({ pwd })}


                    value={this.state.pwd}
                />
                <View style={{ marginRight: 120 }}>
                    <TouchableOpacity onPress={() => this.password()}>
                        <Text style={styles.textPassword} >Forgotten Password ?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                    <TouchableOpacity style={styles.buttonEdit} onPress={() => this.sign()}>
                        <Text style={styles.textEdit} >Signin</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonEdit} onPress={() => { this.getSignup() }} >
                        <Text style={styles.textEdit} >Signup</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={{ fontSize: 25, color: 'green', marginTop: 50 }}> ---------- OR ---------- </Text>
                </View>

                <View style={styles.fbLogin}>
                    <TouchableOpacity onPress={() => this.loginFb()}>
                        <Image
                            style={{ width: 40, height: 40, marginRight: 15 }}
                            source={require('../Images/FaceBook.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={{ width: 37, height: 37 }}
                            source={require('../Images/google.jpg')} />
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
        //  backgroundColor: '#fff',
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
        marginVertical: 10,
        color: 'lightgreen',
    },

    fbLogin: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',

    },
})
