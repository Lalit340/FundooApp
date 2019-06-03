
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { getData, editTrash, editSelect, updatePin, editPhoto, uploadImage, getImage } from '../config/Implementation';
import Display from '../component/CardComponent';
import { Avatar } from "react-native-elements";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-picker";
//import { } from 'json-circular-stringify'


const options = {
  title: 'Select Profile Pic',
  takePhotoButtonTitle: 'Teke a Photo',
  chooseFromLibraryButtonTitle: 'Take Photo from Gallery',

};


export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      click: true,
      note: [],
      pin: false,
      selectItem: false,
      isModal: false,
      photo: '',
      name: '',
      key: '',
      //  pic : this.props.navigation.state.params.photo ,

    }
  }
  static navigationOptions = {
    header: null,
  }

  async imagePicker() {
    await ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          photo: response.uri,
        });
        editPhoto(this.state.photo, this.state.info, this.state.key);
        uploadImage(this.state.photo);
        getImage();
      }
    });
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

    this.reminderNotice();

    AsyncStorage.getItem('FBValue', (err, result) => {
      console.log(result)
      console.log(JSON.parse(result));
      var data = JSON.parse(result);
      console.log(data)
      if (data !== null) {
        this.setState({
          photo: data.pic,
          name: data.userName,
        })
      }
    });


    AsyncStorage.getItem('Data', (err, result) => {
      console.log(result)
      console.log(JSON.parse(result));
      var data = JSON.parse(result);
      console.log(data)
      if (data !== null) {

        this.setState({
          photo: data.pic,
          name: data.fName + ' ' + data.lName,
        })
      }
    });
    
    alert('Date  :: ' + new Date().toString().slice(4 , 10)+'  '+new Date().toString().slice(16, 21));
   

  }
  


  reminderNotice() {
    var keys, info;
    Object.keys(this.state.note).map((note) => {
      keys = note;
      info = this.state.note[keys];
      if (info.reminder === new Date().toString().slice(4 , 10)+'  '+new Date().toString().slice(16, 21)) {
        alert('Date  :: ' + new Date().toString())

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

  setAvatar = () => {
    this.setState({
      isModal: !(this.state.isModal),
    })
  }

  render() {


    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get('window').height;


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

              {/*
                   <TouchableOpacity > <Image
                  style={{ width: 25, height: 25, marginLeft: 15, marginVertical: 6 }}
                  source={require('../Images/lp.png')}
                /> 
                  </TouchableOpacity>*/}
              <View>
                <Avatar
                  size="small"
                  rounded
                  source={{
                    uri: this.state.photo
                  }}
                  onPress={() => this.setAvatar()}
                  containerStyle={{ marginLeft: 17, marginVertical: 3 }}
                />
              </View>



            </View>)

        }

        {/* <View>
          <Modal
            style={{ marginTop: 350 }}
            isVisible={this.state.isModal}
            deviceHeight={500}
            deviceWidth={deviceWidth}
            hasBackdrop	={true}
            onBackdropPress={() => this.setState({ isModal: false })}
          >

            <View>
              <Text> jdgfsfdhghskdfhgjhdsgh </Text>
            </View>

          </Modal>
        </View> */}



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
            :
            this.state.isModal ?
              (<View>
                <Modal
                  style={{ marginTop: 500 }}
                  isVisible={this.state.isModal}
                  deviceHeight={deviceHeight / 1.27}
                  deviceWidth={deviceWidth}
                  hasBackdrop={true}
                  onBackdropPress={() => this.setState({ isModal: false })}
                >

                  <View style={{ alignItems: 'center' }}>
                    <Avatar
                      size='medium'
                      rounded
                      source={{
                        uri: this.state.photo
                      }}
                      onPress={() => { this.state.photo }}
                    />
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.modalText}> {this.state.name} </Text>
                  </View>


                  <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => this.imagePicker()}>
                      <Text style={styles.buttonText}>Change Pic</Text>
                    </TouchableOpacity>
                    <Text>                                                       </Text>
                    <TouchableOpacity onPress={() => this.setAvatar()}>
                      <Text style={styles.buttonText2}>GO Back</Text>
                    </TouchableOpacity>
                  </View>

                </Modal>
              </View>)
              :
              (<View style={styles.container} >

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
  },
  modalText: {
    fontSize: 20,
    marginTop: 8,
    textAlign: 'center',
    color: '#004d40',
  },
  buttonText: {
    fontSize: 20,
    backgroundColor: '#4e342e',
    color: '#fff',
    borderRadius: 5,

  },
  buttonText2: {
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: '#4e342e',
    color: '#fff',

  },

});