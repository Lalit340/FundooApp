import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';

import { getData } from '../config/Implementation';
import Display from '../component/CardComponent';
import { ScrollView } from 'react-native-gesture-handler';
import LessStyle from '../styles/less/app.less';


export default class Note extends Component {

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      note: [],
      text: '',
      click: false,
      reminder: false,
      color: '',

    }
  }

  back() {
    this.props.navigation.goBack();
  }

  reminder() {
    this.setState({ reminder: !(this.state.reminder) })
  }

  handleColor(item) {
    this.setState({ color: item })
  }

  componentDidMount() {

    getData(arr => {

      if (arr) {
        this.setState({
          note: arr
        });
      } else {
        this.setState({
          note: []
        });
      }
    })
  }

  render() {

    var arrData, data, key;
    arrData = Object.keys(this.state.note).map((note) => {
      key = note;
      data = this.state.note[key];
      if (data.trash !== true && data.note == this.state.text || data.title == this.state.text) {

        return (
          <Display Show={data}
            notekey={key}
            view={this.state.click}
            navigation={this.props.navigation}
          />
        )
      }
    });

    var arrRem, dataRem, keyRem;
    arrRem = Object.keys(this.state.note).map((note) => {
      keyRem = note;
      dataRem = this.state.note[keyRem];
      if (dataRem.trash !== true && dataRem.reminder !== '') {

        return (
          <Display Show={dataRem}
            notekey={keyRem}
            view={this.state.click}
            navigation={this.props.navigation}
          />
        )
      }
    });


    var arrCol, dataCol, keyCol, color = [], c;
    arrCol = Object.keys(this.state.note).map((note) => {
      keyCol = note;
      dataCol = this.state.note[keyCol];
      c = dataCol.color
      color.push(c);
      if (dataCol.trash !== true && dataCol.color !== '') {

        return (
          <Display Show={dataCol}
            notekey={keyCol}
            view={this.state.click}
            navigation={this.props.navigation}
          />
        )
      }
    });

    return (
      <View style={{ flex: 1 }}>
       
          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.back()}>
              <Image
                style={{ width: 25, height: 25, marginHorizontal: 15, marginVertical: 6 }}
                source={require('../Images/leftArrow.png')}
              />
            </TouchableOpacity>
            <TextInput
              style={{ width: 300, marginVertical: 2, fontWeight: 'bold' }}
              placeholder='search your Notes'
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
            />

          </View>

          <View style={styles.separetor}></View>

          <TouchableOpacity onPress={() => this.reminder()}>
            <View style={styles.container1}>
              <Text style={styles.textEdit}> Reminder</Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginVertical: 8, marginLeft: 10 }}>
            <Text style={LessStyle.myOtherClass } >COLOURS</Text>
          </View>
       
        
        <ScrollView>
          <View>
            <View>
              <FlatList horizontal={true}
                data={color}
                renderItem={({ item }) => <View style={{ flexDirection: 'row' }}><TouchableOpacity onPress={() => this.handleColor(item)}>
                  <View style={{ backgroundColor: item, marginLeft: 5, borderRadius: 25, height: 40, width: 40, borderColor: 'black', borderWidth: StyleSheet.hairlineWidth }}>
                  </View>
                </TouchableOpacity>
                </View>}
              />
            </View>

           
              <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {arrData}
                </View>
              </ScrollView>
            </View>
            {
              this.state.reminder ?
                (<View>
                  <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      {arrRem}
                    </View>
                  </ScrollView>
                </View>)
                : (<View>

                </View>)}

            {
              this.state.color ?
                (<View>
                  <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      {arrCol}
                    </View>
                  </ScrollView>
                </View>)
                : (<View>

                </View>)}
         
        </ScrollView>
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
    width: '40%',
    height: 65,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'orange',
    borderRadius: 10,

  },
  separetor: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(192,192,192,192)',
  },
  textEdit: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginVertical: 15
  },
});