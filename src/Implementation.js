import firebase from './Firebase'
import database from './Firebase'
import Firebase from './Firebase'

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
    firebase.firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log('logged in');
    }).catch(function (error) {
        if (error) {
            console.log(error);
            return error;
        }
    });

};




