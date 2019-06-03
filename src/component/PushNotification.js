import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

// export default class App extends Component {

// async componentDidMount() {
//   this.checkPermission();
// }

//   //1
// async checkPermission() {
//   const enabled = await firebase.messaging().hasPermission();
//   if (enabled) {
//       this.getToken();
//   } else {
//       this.requestPermission();
//   }
// }

//   //3
// async getToken() {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   if (!fcmToken) {
//       fcmToken = await firebase.messaging().getToken();
//       if (fcmToken) {
//           // user has a device token
//           await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//   }
// }

//   //2
// async requestPermission() {
//   try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//       this.getToken();
//   } catch (error) {
//       // User has rejected permissions
//       console.log('permission rejected');
//   }
// }

//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <Text>Welcome to React Native!</Text>
//       </View>
//     );
//   }
// }

import React, { Component } from "react";

import FCM from "react-native-fcm";

export default class PushNotification extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
    // this method generate fcm token.
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
    });
    
    // This method get all notification from server side.
    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif)
    });
    
    // This method give received notifications to mobile to display.
    this.notificationUnsubscribe = FCM.on("notification", notif => {
      console.log("a", notif);
      if (notif && notif.local_notification) {
        return;
      }
      this.sendRemote(notif);
    });
    
    // this method call when FCM token is update(FCM token update any time so will get updated token from this method)
    this.refreshUnsubscribe = FCM.on("refreshToken", token => {
      console.log("TOKEN (refreshUnsubscribe)", token);
      this.props.onChangeToken(token);
    });
  }
  
  // This method display the notification on mobile screen.
  sendRemote(notif) {
    console.log('send');
    FCM.presentLocalNotification({
      title: notif.title,
      body: notif.body,
      priority: "high",
      click_action: notif.click_action,
      show_in_foreground: true,
      local: true
    });
  }

  componentWillUnmount() {
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }
  render() {
    return null;
  }
}
