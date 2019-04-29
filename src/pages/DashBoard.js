
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { getData } from '../Implementation';
import Display from '../component/CardComponent';
import { ScrollView } from 'react-native-gesture-handler';
import RNLocalNotifications from 'react-native-local-notifications';



export default class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      click: true,
      note: [],
    }
  }

  getClick() {
    this.setState({ click: !(this.state.click) });
  }
  getNote() {
    this.props.navigation.navigate('Note');
  }
  createNote() {
    this.props.navigation.navigate('Create');
  }

  componentDidMount() {
     //RNLocalNotifications.createNotification(1, 'Some text', '2019-04-27 05:10', 'default');

    getData((arr) => {
      console.warn(arr);
      if (arr) {
        this.setState({
          note: arr,   
        });
      } else {
        this.setState({
          note: [],
        });
      }
    });

  }
  render() {

    var arrData, key, data;
    arrData = Object.keys(this.state.note).map((note) => {
      key = note;
      data = this.state.note[key];
      return (
        <Display display={data}
          notekey={key}
          view={this.state.click}
          navigation={this.props.navigation}
        />
      )
    });

    return (
      <View style={{ flex: 1 }} >
        <View style={styles.container1}>
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
            <Image
              style={{ width: 30, height: 30, marginHorizontal: 20, marginVertical: 6 }}
              source={require('../Images/menu.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity  >
            <Text style={styles.textEdit} onPress={() => this.getNote()}>Search your Notes</Text>
          </TouchableOpacity>
          {
            this.state.click ?
              (<View>
                <TouchableOpacity onPress={() => this.getClick()}>
                  <Image
                    style={{ width: 30, height: 30, marginLeft: 110, marginVertical: 6 }}
                    source={require('../Images/rectangle.png')}
                  />
                </TouchableOpacity>
              </View>)
              : (<View>
                <TouchableOpacity onPress={() => this.getClick()}>
                  <Image
                    style={{ width: 30, height: 30, marginLeft: 110, marginVertical: 6 }}
                    source={require('../Images/squar.png')}
                  />
                </TouchableOpacity>
              </View>)
          }
          <TouchableOpacity >
            <Image
              style={{ width: 30, height: 30, marginLeft: 15, marginVertical: 6 }}
              source={require('../Images/lp.png')}
            />
          </TouchableOpacity>

        </View>
         
        <ScrollView>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {arrData}
          </View>
        </ScrollView>

        <View style={{ flex: 1 }}></View>

        <View>
          <View style={styles.container} >

            <View style={styles.container2}>

              <TouchableOpacity >
                <Text style={styles.inputBox} onPress={() => this.createNote()}>Take a Note ...</Text>
              </TouchableOpacity>

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
        </View>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 0,


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
    width: '100%',

    backgroundColor: 'rgba(192,192,192,1)',
  },

  inputBox: {
    marginRight: 90,
    marginVertical: 10,
    fontWeight: 'bold',
  },

  textEdit: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
});