import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables

if (!firebaseAdmin.apps.length) {
  // var serviceAccount : string = require("../../../firebase_admin.json");
  // console.log(serviceAccount);
  let creds: any = {
    // "type": process.env.type,
    "projectId": process.env.project_id,
    // "private_key_id": process.env.private_key_id,
    "privateKey": process.env.private_key?.replace(/\\n/gm, "\n") ?? undefined,
    "clientEmail": process.env.client_email,
    // "clientId": process.env.client_id,
    // "auth_uri": process.env.auth_uri,
    // "token_uri": process.env.token_uri,
    // "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    // "client_x509_cert_url": process.env.client_x509_cert_url
  };
  // console.log(creds);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      creds
    ),
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

}


export { firebaseAdmin };