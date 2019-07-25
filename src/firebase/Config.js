import Firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyByIf48kyKSXPS_Sk0Ui1XuVYNRTmWFPjI",
    authDomain: "extick-fbd97.firebaseapp.com",
    databaseURL: "https://extick-fbd97.firebaseio.com",
    projectId: "extick-fbd97",
    storageBucket: "extick-fbd97.appspot.com",
    messagingSenderId: "328791053117",
    appId: "1:328791053117:web:5d285164a39e2f39"
};
// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();