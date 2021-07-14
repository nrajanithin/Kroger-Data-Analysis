import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyBH-wykhew7j86SoF0OjlPoppNlnykVgDg",
  authDomain: "ccmidterm-10f97.firebaseapp.com",
  projectId: "ccmidterm-10f97",
  storageBucket: "ccmidterm-10f97.appspot.com",
  messagingSenderId: "299014360361",
  appId: "1:299014360361:web:ab3099a3d02c7299dd7b38",
  databaseURL:"https://ccmidterm-10f97-default-rtdb.firebaseio.com/"
};
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;