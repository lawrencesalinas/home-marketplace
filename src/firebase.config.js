// use ifrestore as database
import { getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9ecw_8P34rm3dMyCDZ1FZ-U-zF4mb5X4",
  authDomain: "home-marketplace-b8cba.firebaseapp.com",
  projectId: "home-marketplace-b8cba",
  storageBucket: "home-marketplace-b8cba.appspot.com",
  messagingSenderId: "284090156853",
  appId: "1:284090156853:web:b6d591dedd49cff024ee7c"
};


// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()