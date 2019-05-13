import { AsyncStorage } from 'react-native';


export default async function saveData(email, password, fname, lname, mobno, dob){

    var data ={
        email: email,
        password: password,
        FirstName: fname,
        LastName: lname,
        mobNo: mobno,
        DOB: dob,
    }

    AsyncStorage.setItem('data' ,JSON.stringify(data)) ;
    
}