import firebase from 'firebase';


var config = {
  apiKey: "AIzaSyAojzVy9BMu5sE4k2012chUv5TXjfJI7OY",
  authDomain: "fundoonotes-ccb4b.firebaseapp.com",
  databaseURL: "https://fundoonotes-ccb4b.firebaseio.com",
  projectId: "fundoonotes-ccb4b",
  storageBucket: "fundoonotes-ccb4b.appspot.com",
  messagingSenderId: "356919157053"
};
firebase.initializeApp(config);

const database = firebase.database();
export default {firebase , database };