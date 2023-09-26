import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCZJL_q5qSxZFJdrXWgu7dsoKCtCIH8u58",
  authDomain: "omegacloud-b6253.firebaseapp.com",
  projectId: "omegacloud-b6253",
  storageBucket: "omegacloud-b6253.appspot.com",
  messagingSenderId: "573969660901",
  appId: "1:573969660901:web:ee7eb8e8e1d43a0b374d0c"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

}

export default firebase;