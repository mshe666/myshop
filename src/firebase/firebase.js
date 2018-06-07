
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAvemm-y9YWOijcz64uLORCHC0WQLoCeuk",
    authDomain: "myshop-89990.firebaseapp.com",
    databaseURL: "https://myshop-89990.firebaseio.com",
    projectId: "myshop-89990",
    storageBucket: "myshop-89990.appspot.com",
    messagingSenderId: "766801415320"
};

let fireBase = firebase.initializeApp(config);

console.log('firebase.js line 15: firebase = ' + fireBase);

export default fireBase;
