// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBYQiGCLnPay9JhZgZ048VwKR1nAtpZKHc",
  authDomain: 'neurobit-auth.firebaseapp.com',
  projectId: 'neurobit-auth',
  storageBucket: 'neurobit-auth.appspot.com',
  messagingSenderId: '118774990799',
  appId: 'project-118774990799',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signInWithRedirect };
