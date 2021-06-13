import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA5UA8E-jsqCZ81YoGmne3TinpUAZHCFd8",
  authDomain: "gk-ak-f3c3e.firebaseapp.com",
  projectId: "gk-ak-f3c3e",
  storageBucket: "gk-ak-f3c3e.appspot.com",
  messagingSenderId: "873488153043",
  appId: "1:873488153043:web:91cd5aef45a706f81dd726",
  measurementId: "G-HV3EQBNJXD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
