

import {Platform} from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';



var notificationListener = null;
var refreshTokenListener = null;
const FCM_URL = 'https://fcm.googleapis.com/fcm/send';
const FirebaseServerKey = "AIzaSyCvq7LVfqortm3EdX7atFdRCuxRrug6cyA" ;


export const init = (cb) => {
  FCM.requestPermissions();
  FCM.getFCMToken().then(token => {
    cb(token)
  });
  refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
    cb(token);
  });
}

export const onNotification = (cb) => {
  notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
    cb(notif);

    if (  Platform.OS === 'android' || Platform.OS === 'ios') {
      switch (notif._notificationType) {
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData)
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All)
          break;
      }
    }
  })
}

export const unbind = () => {
  if (notificationListener) notificationListener.remove();
  if (refreshTokenListener) refreshTokenListener.remove();
}

export const sendNotification = (token ,title , note) => {
  alert('hi :'+token)
  let body = JSON.stringify({
    "to": token,
    "notification": {
      "title": title || '',
      "body": note || '',
      "sound": "default"
    },
    "priority": 10
  });

  let headers = new Headers({
    "Content-Type": "application/json",
    "Content-Length": parseInt(body.length),
    "Authorization": "key=" + FirebaseServerKey
  });

  fetch(FCM_URL, { method: "POST", headers, body })
    .then(response => {
      console.log("Send response: ", response);
      alert(" fhfj :"+ response.status);
      if (response.status === 200) {
        onNotification(data => {
          console.log(data);
        });
      }
    })
    .catch(error =>{ console.log("Error sending: ", error)
         alert("error"+error.response.status);
  });
}
