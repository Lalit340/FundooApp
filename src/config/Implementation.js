import firebase from './Firebase'
import database from './Firebase'
import Firebase from './Firebase'
import { AsyncStorage } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import RNFetchBlob from 'react-native-fetch-blob';

export default async function register(email, password, fname, lname, mobno, dob, pic) {
    var arr = {
        email: email,
        password: password,
        FirstName: fname,
        LastName: lname,
        mobNo: mobno,
        DOB: dob,
        photo: pic,
    }
    console.log(arr + "Data of register ");

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

export async function signinPage(email, password, callback) {

    await firebase.firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('logged in');
            return callback(true);
        }).catch((error) => {
            console.log('logged failed');
            if (error) {
                return callback(false);
            }
        });


};


export async function createNotes(title, note, select, reminder, trash, archive, color, pin) {

    var user = await Firebase.firebase.auth().currentUser

    var email = user.email;
    var arr = {
        title: title,
        note: note,
        select: select,
        reminder: reminder,
        archive: archive,
        trash: trash,
        color: color,
        pin: pin,
        email: email,

    }

    await database.database.ref('/UserNote').push(arr)

    AsyncStorage.setItem('UserNote', JSON.stringify(arr))

}

export async function forgotPassword(Email) {

    Firebase.firebase.auth().sendPasswordResetEmail(Email)
        .then(function (user) {
            alert('Please check your email...')
        }).catch(function (e) {
            console.log(e)
        })
}


export async function logOut() {
    await Firebase.firebase.auth().signOut()
    AsyncStorage.clear();
    console.log('successfully logout is done');
}


export async function getData(callback) {

    var user = await Firebase.firebase.auth().currentUser;

    console.warn(user + " current user")

    var email = user.email;
    await database.database.ref('/UserNote').orderByChild('email').equalTo(email).on("value", snap => {
        var data = snap.val()

        return callback(data);

    })

}

export async function saveData(username, pwd) {

    await Firebase.database.ref('UsersInfo').orderByChild('email').equalTo(username).on('value', snap => {
        snap.forEach(function (snap) {
            var email = snap.child('email').val();
            var fName = snap.child('FirstName').val();
            var lName = snap.child('LastName').val();
            var photo = snap.child('photo').val();
            var key = snap.key;

            var arr = {
                pic: photo,
                email: email,
                fName: fName,
                lName: lName,
                key: key,

            }
            AsyncStorage.setItem('Data', JSON.stringify(arr));

        })


    });

}


export async function editNotes(Title, notes, note, key) {
    //  alert(note);
    note = {
        title: Title,
        note: notes,

    }
    updateNotes(note, key);
}


export async function updateNotes(note, key) {
    console.warn(note + 'this note is updated');
    database.database.ref('/UserNote').child(key).update(note);
}


export async function editReminder(reminder, note, key) {

    note = {
        reminder: reminder
    }
    updateNotes(note, key);
}


export async function editSelect(select, note, key) {

    note = {
        select: select
    }
    updateNotes(note, key);
}

export async function updatePin(pin, note, key) {
    console.log('pin is updated');
    note = {
        pin: pin
    }
    updateNotes(note, key);
}

export async function editTrash(trash, note, key) {
    console.log('trash is updated');
    note = {
        trash: trash
    }
    updateNotes(note, key);
}

export async function editArchive(archive, note, key) {
    console.log('archive is updated');
    note = {
        archive: archive,
    }
    updateNotes(note, key);
}

export async function editColor(color, note, key) {
    console.log('pin is updated');
    note = {
        color: color,
    }
    updateNotes(note, key);
}

export async function deleteNote(note, key) {
    console.warn(note + 'this note is delete');
    database.database.ref('/UserNote').child(key).remove();
}

export async function fbLogin(callback) {
    await LoginManager.logInWithReadPermissions(['public_profile'])
        .then((result) => {
            if (result.isCancelled) {
                alert('Login was cancelled');
            } else {
                return AccessToken.getCurrentAccessToken();
            }
        }).then((data) => {
            var cradential = firebase.firebase.auth.FacebookAuthProvider.credential(data.accessToken)
            console.log(data.accessToken);
            return firebase.firebase.auth().signInAndRetrieveDataWithCredential(cradential);
        }).then((currentUser) => {
            console.log(' currentUser Data :' + JSON.stringify(currentUser));
            return callback(currentUser);

        }).catch((error) => {
            alert('Login failed with error: ' + error);
            return callback(error);
        });

}

export async function fbLogout() {
    await LoginManager.logOut();
}


export async function editPhoto(pic, info, key) {
    info = {
        photo: pic
    }

    editInfo(info, key);
}

export async function editInfo(info, key) {
    console.warn(info + 'this note is updated');
    database.database.ref('/UsersInfo').child(key).update(info);
}

const Blob = RNFetchBlob.polyfill.Blob
//const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
// const Fetch = RNFetchBlob.polyfill.Fetch
// // replace built-in fetch
// window.fetch = new Fetch({
//     // enable this option so that the response data conversion handled automatically
//     auto: true,
//     // when receiving response data, the module will match its Content-Type header
//     // with strings in this array. If it contains any one of string in this array, 
//     // the response body will be considered as binary data and the data will be stored
//     // in file system instead of in memory.
//     // By default, it only store response data to file system when Content-Type 
//     // contains string `application/octet`.
//     binaryContentTypes: [
//         'image/',
//         'video/',
//         'audio/',
//         'foo/',
//     ]
// }).build();

export async function uploadImage(path) {
    const imageFile = RNFetchBlob.wrap(path);
    const user = firebase.firebase.auth().currentUser;
    var email = user.email;
    const ref = firebase.firebase.storage().ref(email + '/pic');
    Blob.build(imageFile, { type: 'image/jpg;' })
        .then((imageBlob) => {
            uploadBlob = imageBlob;
            return ref.put(imageBlob, { contentType: 'image/jpg' });
        })
        // .then(() => {
        //     uploadBlob.close();
        //     return ref.getDownloadURL();
        // })
        .catch((error) => {
            console.log('profile pic not updated');
            return error;
        });
    getImage();
}


export async function getImage() {
    const user = await firebase.firebase.auth().currentUser;
    const ref = await firebase.firebase.storage().ref(user.email + '/pic');
    var imag = await ref.getDownloadURL();

    uploadPhotos(imag, user.email);
    //  alert('imag  :' + imag)

}


export async function uploadPhotos(imag, username) {

    await Firebase.database.ref('UsersInfo').orderByChild('email').equalTo(username).on('value', snap => {
        snap.forEach(function (snap) {
            var key = snap.key;
            var info = snap.val();

            editPhoto(imag, info, key);

            // alert('edit success ' + imag);

        });
    });

}
