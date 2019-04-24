
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import register from '../Implementation';




class SingupPage extends Component {

    constructor() {
        super();
        this.state = {
            user: '',
            pwd: '',
            pwd1: '',
            firstName: '',
            lastName: '',
            mobNo: '',
            dob: '',
        }

    }


    static navigationOptions = { header: null };

    signin() {
        this.props.navigation.navigate('Login');
    }

    validation() {
        var user, pwd, pwd1, fName, lName, mobNo, dob, phoneNo, pattern;
        //asigning values to  variable
        user = this.state.user;
        pwd = this.state.pwd;
        pwd1 = this.state.pwd1;
        fName = this.state.firstName;
        lName = this.state.lastName;
        mobNo = this.state.mobNo;
        dob = this.state.dob;

        phoneNo = /^\d{10}$/;
        pattern = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/

        if (user.trim() == '')
            alert('UserName is needed');
        else if (user.indexOf('@') == -1 && user.indexOf('.com') == -1)
            alert('enter a valid username');
        else if (pwd.trim() == '' )
            alert('password  is needed');
        else if (pwd !== pwd1 && pwd.length < 8)
            alert('insert a valid password ')
        else if (fName.trim() == '' || fName.length < 4)
            alert('Enter a proper formed name');
        else if (lName.trim() == '' || lName.length < 2)
            alert('Enter a proper formed LastName');
        else if (mobNo.trim().length < 10 || !phoneNo.test(mobNo))
            alert('Enter a valid Mobile number');
        else if (dob.trim() == '' || !pattern.test(dob))
            alert('Enter DOB Currectly');
        else {
            console.log('validation succeeded');
            return true;
        }
    }
    getLoggedIn() {
        var check = this.validation();
        if (check) {
            var data = register(this.state.user, this.state.pwd, this.state.firstName,
                this.state.lastName, this.state.mobNo, this.state.dob);
        }
        if (data) {
            this.props.navigation.navigate('Login');
        }
    }

    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.container1}>
                        <Image
                            style={{ width: 80, height: 70 }}
                            source={require('../Images/f_IMG.jpg')}
                        />
                        <Text style={styles.welcome}>-- Welcome to FundooNotes --</Text>
                        <Text style={styles.welcome1}>Registration page</Text>
                    </View>

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter First Name '
                        placeholderTextColor='#ffffff'
                        onChangeText={(firstName) => this.setState({ firstName })}
                        value={this.state.firstName}
                    />

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter Last Name '
                        placeholderTextColor='#ffffff'
                        onChangeText={(lastName) => this.setState({ lastName })}
                        value={this.state.lastName}
                    />

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter mobile number '
                        placeholderTextColor='#ffffff'
                        onChangeText={(mobNo) => this.setState({ mobNo })}
                        value={this.state.mobNo}
                    />

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter DOB dd/MM/yyyy '
                        placeholderTextColor='#ffffff'
                        onChangeText={(dob) => this.setState({ dob })}
                        value={this.state.dob}
                    />
                    <TextInput
                        style={styles.textBox}
                        placeholder='enter username '
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

                    <TextInput
                        style={styles.textBox}
                        placeholder='enter password '
                        placeholderTextColor='#ffffff'
                        secureTextEntry={true}
                        onChangeText={(pwd1) => this.setState({ pwd1 })}
                        value={this.state.pwd1}
                    />

                    <TouchableOpacity style={styles.buttonEdit}>
                        <Text style={styles.textEdit} onPress={() => this.getLoggedIn()} >Register</Text>
                    </TouchableOpacity>

                    <View style={styles.container2}>

                        <Text style={styles.rowEdit}>Already have account?</Text>

                        <TouchableOpacity onPress={() => this.signin()}>
                            <Text style={styles.textEdit1} >Sing in</Text>
                        </TouchableOpacity>

                    </View>

                </View >
            </ScrollView>

        );
    }
}


export default SingupPage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#424242',
        alignItems: 'center',

    },
    container1: {
        alignItems: 'center',
        marginVertical: 20,

    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 50,

    },

    welcome: {
        fontSize: 20,
        color: 'brown',
    },
    welcome1: {
        fontSize: 20,
        color: 'green',
    },
    textBox: {
        width: 300,
        borderRadius: 20,
        marginVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },

    buttonEdit: {
        width: 90,
        height: 40,
        marginHorizontal: 40,
        marginVertical: 10,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(192,192,192,0.5)',
        borderRadius: 10,
    },

    textPassword: {
        marginVertical: 10,
        color: 'lightgreen',
        textAlign: 'right',
    },
    textEdit: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    textEdit1: {
        fontSize: 20,
        color: 'blue',

    },
    rowEdit: {
        color: 'white',
        fontSize: 15,
    },
})
