import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const REACT_APP_AUTH_DOMAIN = "oasis19-c481d.firebaseapp.com";
const REACT_APP_DATABASE_URL = "https://oasis19-c481d.firebaseio.com";
const REACT_APP_PROJECT_ID = "oasis19-c481d";
const REACT_APP_STORAGE_BUCKET = "oasis19-c481d.appspot.com";
const REACT_APP_MESSAGING_SENDER_ID = "1005380465971";
const REACT_APP_APP_ID = "1:1005380465971:web:0cee172c496fd79cbffa46";
const REACT_APP_MEASUREMENT_ID = "G-LY5FKWD4HL";

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    databaseURL: REACT_APP_DATABASE_URL,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

export default firestore;