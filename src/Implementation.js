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
    var check = await firebase.firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        console.log('logged in');
    }).catch(function (error) {
        if (error) {
            console.log(error);
            return error;
        }
    });
    if (check) {
        return check;
    }

};


export async function createNotes(title, note, reminder, trash, archive, color, pin) {

    var user = await Firebase.firebase.auth().currentUser

    var email = user.email;
    var arr = {
        title: title,
        note: note,
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



export async function logOut() {
    await Firebase.firebase.auth().signOut()
    AsyncStorage.clear();
    console.log('successfully logout is done');
}



export async function getData(callback) {

    var user = await Firebase.firebase.auth().currentUser

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
            var key = snap.key;
            var arr = {
                email: email,
                key: key,
            }

            AsyncStorage.setItem('data', JSON.stringify(arr));

        })


    });

}


export async function editNotes(Title, notes, reminder, note, key) {

    note = {
        title: Title,
        note: notes,
        reminder: reminder
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


export async function updatePin(pin, note, key) {
    console.log('pin is updated');
    note = {
        pin: pin
    }
    updateNotes(note, key);
}

export async function editTrash(trash, note, key) {
    console.log('pin is updated');
    note = {
        trash: trash
    }
    updateNotes(note, key);
}

export async function editArchive(archive, note, key) {
    console.log('pin is updated');
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