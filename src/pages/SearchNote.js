import React, { Component } from 'react';
import {View , Text , StyleSheet , Image , TextInput,TouchableOpacity} from 'react-native';






export default class Note extends Component {

  static navigationOptions ={ header : null };

  back(){
   this.props.navigation.navigate('Drawer');

  }

  render() {
    return (
      <View>
     <View style={styles.container}>
     <TouchableOpacity onPress={() =>this.back()}>
         <Image 
          style ={{width: 25, height: 25, marginHorizontal: 15, marginVertical: 6 }}
          source = {require('../Images/leftArrow.png')}
         />
     </TouchableOpacity>
        <TextInput 
        style ={{width : 300 ,marginVertical : 2 , fontWeight : 'bold' }}
        placeholder ='search your Notes'
        />
     </View>

     <View style={styles.separetor}></View>

     </View>
    );
  }
}

const styles = StyleSheet.create ({
  container :{
    flexDirection : 'row',
    height : 40,
    
     
  },
  separetor :{
      height : 1,
      width : '100%',
      backgroundColor : 'rgba(192,192,192,192)',
  },

});