
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';




export default class HomePage extends Component {


  static navigationOptions = ({navigation}) => {
    let drawerLebel = 'Home';

    return {drawerLebel};
  }
  getNote = () => {
    this.props.navigation.navigate('Note');
  }

  render() {
    return (
      <View >
        <View style={styles.container1}>
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
            <Image
              style={{ width: 30, height: 30, marginHorizontal: 20, marginVertical: 6 }}
              source={require('../Images/menu.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.getNote()} >
            <Text style={styles.textEdit} onPress={this.getNote}>Search your Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Image
              style={{ width: 30, height: 30, marginLeft: 110, marginVertical: 6 }}
              source={require('../Images/squar.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image
              style={{ width: 30, height: 30, marginLeft: 15, marginVertical: 6 }}
              source={require('../Images/lp.png')}
            />
          </TouchableOpacity>

        </View>

        <View style={styles.container}>
          <Text style={styles.editText}> hello Your success to logged in/ singup !!! </Text>
        </View>

        <View style={styles.container2}>

          <TextInput
            style={styles.inputBox}
            placeholder='Take your notes'
            placeholderTextColor='black'
          />
          <TouchableOpacity >
            <Image
              style={{ width: 20, height: 20, marginHorizontal: 15, marginVertical: 10 }}
              source={require('../Images/checked.png')}
            /></TouchableOpacity>
          <TouchableOpacity >
            <Image
              style={{ width: 20, height: 20, marginHorizontal: 15, marginVertical: 10 }}
              source={require('../Images/brush.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image
              style={{ width: 20, height: 20, marginHorizontal: 15, marginVertical: 10 }}
              source={require('../Images/mic.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image
              style={{ width: 20, height: 20, marginHorizontal: 15, marginVertical: 10 }}
              source={require('../Images/gallery.png')}
            />
          </TouchableOpacity>
        </View>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 261,
    alignItems: 'center',
  },
  container1: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 20,
    height: 40,
    width: 390,

    backgroundColor: 'rgba(0,0,255,0.4)',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 40,
    width: 410,

    backgroundColor: 'rgba(192,192,192,1)',
  },

  editText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputBox: {
    marginRight: 90,
  },

  textEdit: {
    marginVertical: 10,
  },
});