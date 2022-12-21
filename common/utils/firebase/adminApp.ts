import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables

if (!firebaseAdmin.apps.length) {
  // var serviceAccount : string = require("../../../firebase_admin.json");
  // console.log(serviceAccount);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      {
      "type": "service_account",
      "project_id": "holifi-67a6d",
      "private_key_id": "7a5b5802f95a3ab77292bd7fce13fe879d3bf801",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxROtZxwZQPnrn\nRSGtbI7BjKLqs/B2EjUK5MUua3O5MqNqvWS2klgbKudMYyqtH3zOrUnXSxGbX2DX\n+37YQVQoWBc2R/Nj6bxFwyjqEs5gkaext8WpaNVs4w7MXpEkZM3Ee61FzK+TWbQj\nGIeYqQ3OnWkzKIJtSsr8l+YPVjkbavEbidRGT1dF2u4tm9cDx8fqZE99a3TOVsxT\n93MyGTVDZXFIVj/5qrOX+aVX7O2maMDwgQTxyN+atv+M+8FkHf07ZgSB8Jaig3rs\nDUeN9qJ7vOtk9hjHPXmgsLiQ7E7omntpyhKs/gpT/BSFIkwHZcgEyGHmox7ci7iG\nLPsCmeKNAgMBAAECggEAI4Qt7TJZevlRsYVhznfKEFBHkeOUYWubcf/M29SOfoP9\nRtUEWSnv+h158w2JTt9Yp6YDfd2d/PW6lvtd+iD4pg6kM+1tf86kOIv15hP3glSc\ndxhdQ2hsHmFNpTerN9H0ghHPcQUmBk06MK/o9vaj/AoAuk269/+8tKgQYXFChtHs\ndzHdZzBrmnS1U3p8bJTtmol8P6yLTsFchbneIraE/jt1h8So4z+5CAVTvGDKG+V7\nTr7k6+AW0pInkNI3Y8V2amtT/pjXdDAlY2iqwp6hG8P0Neu0sftxMtk2zZ/tAaTZ\neBhn/GKZuABmZo/RHhtdyBkqR+U9DqUumBFlTn28wQKBgQDXsdkiOa/Iv4MoOflU\nUC930MrjnJqR7075sagnc3JvIIuQsIL01dT63OhGVwZ7pFUvlfcAxX2/pdAW3lFy\nZttgflmhFHCX9H/23C2FNlZiVJZIgvpSxvujJFS/dcQBtCyxlJHjUT2FnwwIzNuW\nqs2XLsDZ4qHl636uMvJ1Z1BkoQKBgQDSZOq3KAd3xlCaThBMOgvdlmKwW1soCg5l\nwOvqKafNoy23oFT42L3XskIWjNih298AQW7uqbv8mzBZk+kS3y4KKldutT2qnB+o\nX5M2VOiKHYS1MUcbI5KUVoIieyJ6suB3FKdw0oELko2ZgnEeqg4FRYgOIasgW9HB\nm5Im2vjKbQKBgQDUVMR+d7E++qBfgiqawFDqLwT7adeTn7PsA+KX64MUOEKLzecs\npC+EQOD7FYJRRuWA8az0+nUeq1kcmgAtkWmWJOuQsXFhdRRfbEH3aBVDuScz/JP1\n1uIyqHow+/pW/wocSjgPQZNBrd8H7rqgKEY49JJuKzbbAqdzTr31qx2t4QKBgCQr\nq1qPrDEATC0rDIw+Unnm99J/8j0A9Zaywxw/yxSEYEC4dMNPZ9vkTo5X6opxJXaC\nyVKIpcP43igYULKo4d5nhx6GVDK3oo2s2L83e7768izAawwUYofUE41gA/56MDLo\nvxybZAocSPHCRjZSYBSx7oEXcrcecgJJ/6dkb+9FAoGBAKi3qSK8mUmyPhLHC4h0\nGQ/I0x+r/hoew+gVIBtSJIm6posKFpHV1oKuBeeGUWDC/CwaE+mqhn5lpfew6kHG\nYSliTjlmsdQUOewtBkJuWYbCde+6PPrQpkDcolptq4w9jdHWIPUmnpCEG/uzdbkV\n3yKMdRh+ULP5k9QLmXYigczG\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-stpri@holifi-67a6d.iam.gserviceaccount.com",
      "client_id": "102833369243388279454",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-stpri%40holifi-67a6d.iam.gserviceaccount.com"

  } as ServiceAccount),
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

}


export { firebaseAdmin };