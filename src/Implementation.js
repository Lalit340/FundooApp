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


export async function createNotes(title, note) {
    var user = Firebase.firebase.auth().currentUser;

    var email = user.email;
    var arr = {
        title: title,
        note: note,
        email: email,
    }

    database.database.ref('/UserNote').push(arr)

}



export async function logOut() {
    await Firebase.firebase.auth().signOut()
    console.log('successfully logout is done');
}



export async function getData(callback) {
   var user = Firebase.firebase.auth().currentUser ;
   var email = user.email ;

   Firebase.database.ref('UserNote').orderByChild('email').equalTo(email).on('value' , snap =>{
     var data = snap.val();

     return callback(data);
   })
}