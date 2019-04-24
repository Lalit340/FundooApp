import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { logOut } from '../Implementation';




export default class Note extends Component {

    

    mainPage() {
        logOut();
        this.props.navigation.navigate('Login');
    }

    back() {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.back()}>
                        <Image
                            style={{ width: 25, height: 25, marginHorizontal: 15, marginVertical: 6 }}
                            source={require('../Images/leftArrow.png')}
                        />
                    </TouchableOpacity>

                </View>

                <View style={styles.container1}>
                    <Text style={styles.textEdit}> Do you want to SignOut this page?</Text>
                    <View style={styles.container2}>
                        <TouchableOpacity >
                            <Text style={styles.textEdit1} onPress={() => this.mainPage()}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity >
                            <Text style={styles.textEdit1} onPress={() => this.back()}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       
        flexDirection: 'row',
        height: 40,


    },
    container1: {
        marginVertical : 250,
        justifyContent: 'center',
        alignItems: 'center',

    },
    container2: {
        flexDirection: 'row',
        marginVertical : 15,

    },


    textEdit: {

        fontSize: 15,
        fontWeight: 'bold',
    },
    textEdit1: {
        width : 40 ,
        height : 25 ,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'brown',
        marginHorizontal : 25 ,
        textAlign : 'center' ,
       
    }


});