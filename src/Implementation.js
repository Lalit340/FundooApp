import firebase from './Firebase'
import database from './Firebase'
import Firebase from './Firebase'
import { AsyncStorage } from 'react-native';


export default async function register(email, password, fname, lname, mobno, dob) {
    var arr = {
        email: email,
        password: password,
        FirstName: fname,
        LastName: lname,
        mobNo: mobno,
        DOB: dob,
    }
    await Firebase.firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        database.database.ref('/UsersInfo').push(arr).then(() => {
            var user = Firebase.firebase.auth().currentUser
            user.sendEmailVerification().then(() => {

            });
            console.log('Inserted data');
        })

    }).catch(function (error) {
        if (error) {
            console.log(error);
            return error;
        }
    });
};

export async function signinPage(email, password) {
   var check= await firebase.firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log('logged in');
    }).catch(function (error) {
        if (error) {
            console.log(error);
            return error;
        }
    });
    if(check){
        return check ;
    }

};


export async function createNotes(title, note, reminder) {

    var user = await Firebase.firebase.auth().currentUser

    var email = user.email;
    var arr = {
        title: title,
        note: note,
        reminder: reminder,
        email: email,
    }

    await database.database.ref('/UserNote').push(arr)

    AsyncStorage.setItem('UserNote', JSON.stringify(arr))

}



export async function logOut() {
    await Firebase.firebase.auth().signOut()
    AsyncStorage.clear();
    console.log('successfully logout is done');
}



export async function getData(callback) {

    var user = await Firebase.firebase.auth().currentUser

    console.warn(user + " current user")

    var emai = user.email;
    await Firebase.database.ref('UserNote').orderByChild('email').equalTo(emai).on("value", snap => {
        var data = snap.val()

        return callback(data)

    })

}

export async function getLogin(username, pwd) {
    var d = await Firebase.database.ref('UsersInfo').orderByChild('email').equalTo(username).on('value', snap => {
        snap.forEach(function (snap) {
            var emai = snap.child('email').val();
            var password = snap.child('password').val();
            var arr = {
                email: emai,
                password: password,
            }

            AsyncStorage.setItem('data', JSON.stringify(arr));

        })
        if (d) {
            return true;
        } else {
            return false;
        }

    });

}