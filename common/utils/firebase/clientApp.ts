import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { initializeApp, getApp, FirebaseApp } from "firebase/app"
import { Auth, getAuth } from "firebase/auth";
import { firebase_config } from "./config";
import { getAnalytics } from "firebase/analytics";


const clientCredentials = firebase_config;
let firebaseApp : FirebaseApp;
try{
    firebaseApp = getApp();
} catch(e) {
    firebaseApp = initializeApp(clientCredentials);
    const analytics = getAnalytics(firebaseApp);

}
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
export {firebaseApp};
export { firestore };
export { auth };
