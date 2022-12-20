import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables

if (!firebaseAdmin.apps.length) {
  var serviceAccount : string = require("/Users/jonahkornberg/Documents/fun/JakWebapp/jak-nft-firebase-adminsdk-oldyo-f4fa957b12.json");
  console.log(serviceAccount);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      serviceAccount
    ),
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

}


export { firebaseAdmin };