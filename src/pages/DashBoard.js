
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { getData, editTrash, editSelect, updatePin } from '../Implementation';
import Display from '../component/CardComponent';
//import RNLocalNotifications from 'react-native-local-notifications';



export default class HomePage extends Component {

  constructor() {
    super();
    this.state = {
      click: true,
      note: [],
      pin: false,
      selectItem: false,
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

    getData(arr => {
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

  goBack() {
    let info, keys;
    Object.keys(this.state.note).map((note) => {
      keys = note;
      info = this.state.note[keys];
      if (info.select) {
        editSelect(this.state.selectItem, info, keys);
      }
    });
  }
  getPin() {
    let info, keys, selectList;
    console.warn('pin ' + this.state.pin)
    this.setState({ pin: !(this.state.pin) });
    Object.keys(this.state.note).map((note) => {
      keys = note;
      info = this.state.note[keys];
      selectList = false;
      if (info.select) {
        updatePin(this.state.pin, info, keys);
        editSelect(selectList, info, keys);
      }
    });

  }
  handleTrash() {
    let info, keys, trash, selectList;
    console.warn('this.state.note' + this.state.note);

    Object.keys(this.state.note).map((note) => {
      keys = note;
      info = this.state.note[keys];
      trash = true;
      selectList = false;
      if (info.select) {
        editTrash(trash, info, keys);
        editSelect(selectList, info, keys);
      }
    });

  }

  render() {

    var arrData, key, data;
    var selectItem = false;
    arrData = Object.keys(this.state.note).map((note) => {
      key = note;
      data = this.state.note[key];
      if (data.select === true) {
        selectItem = true;
      }

      if (data.trash === false && data.archive !== true && data.pin === false) {
        return (
          <Display Show={data}
            notekey={key}
            view={this.state.click}
            navigation={this.props.navigation}
          />

        )
      }
    });

    var arrPin, key, data;
    arrPin = Object.keys(this.state.note).map((note) => {
      key = note;
      data = this.state.note[key];
      if (data.trash === false && data.archive !== true && data.pin === true) {
        return (
          <Display Show={data}
            notekey={key}
            view={this.state.click}
            navigation={this.props.navigation}
          />

        )
      }
    });

    return (
      <View style={{ flex: 1 }} >
        {
          selectItem ?
            (<View style={styles.container1}>
              <TouchableOpacity onPress={() => this.goBack()}>
                <Image
                  style={{ width: 30, height: 30, marginHorizontal: 20, marginVertical: 6 }}
                  source={require('../Images/leftArrow.png')}
                />
              </TouchableOpacity>


              <Text>                                                                 </Text>

              {
                this.state.pin ?
                  (<View>
                    <TouchableOpacity onPress={() => this.getPin()}>
                      <Image
                        style={{ width: 30, height: 30, marginLeft: 20, marginVertical: 6 }}
                        source={require('../Images/unpin.png')}
                      />
                    </TouchableOpacity>
                  </View>)
                  : (<View>
                    <TouchableOpacity onPress={() => this.getPin()}>
                      <Image
                        style={{ width: 30, height: 30, marginLeft: 20, marginVertical: 6 }}
                        source={require('../Images/pin.png')}
                      />
                    </TouchableOpacity>
                  </View>)

              }
              <TouchableOpacity onPress={() => this.handleTrash()}>
                <Image
                  style={{ width: 30, height: 30, marginHorizontal: 15, marginVertical: 6 }}
                  source={require('../Images/delete.png')}
                />
              </TouchableOpacity>

            </View>)
            :
            (<View style={styles.containers1}>
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
                        style={{ width: 25, height: 25, marginLeft: 110, marginVertical: 6 }}
                        source={require('../Images/rectangle.png')}
                      />
                    </TouchableOpacity>
                  </View>)
                  : (<View>
                    <TouchableOpacity onPress={() => this.getClick()}>
                      <Image
                        style={{ width: 25, height: 25, marginLeft: 110, marginVertical: 6 }}
                        source={require('../Images/squar.png')}
                      />
                    </TouchableOpacity>
                  </View>)
              }
              <TouchableOpacity >
                <Image
                  style={{ width: 25, height: 25, marginLeft: 15, marginVertical: 6 }}
                  source={require('../Images/lp.png')}
                />
              </TouchableOpacity>

            </View>)

        }

        <ScrollView>
          <View>
            <Text style={{ fontSize: 10, marginLeft: 15 }}>Pinned</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {arrPin}
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 10, marginLeft: 15, marginTop: 15 }}>OTHER</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {arrData}
            </View>
          </View>
        </ScrollView>


        <View style={{ flex: 1 }}></View>
        {
          selectItem ?
            (<View>

            </View>)
            : (<View style={styles.container} >

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
            )
        }
      </View >
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
    height: 40,
    width: '100%',
    backgroundColor: '#50C7C7',
  },
  containers1: {
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
  separetor: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
  }

});