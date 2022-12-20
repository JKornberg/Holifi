// import { getStorage } from "firebase-admin/storage";
// import {getFirestore} from "firebase-admin/firestore";
import { firebaseAdmin } from "./adminApp";


// export const saveBlobToFirebaseAdmin = async function (image: Blob | ArrayBuffer, filename: string): Promise<string> {
//     return new Promise((resolve, reject) => {

//         const storage = getStorage(firebaseAdmin.app());
//         const bucket = storage.bucket()
//         const file = bucket.file(filename);

//         const blobStream = file.createWriteStream({
//             resumable: false,
//         }).on('error', (err) => { console.log(err); reject("fail"); }).on('finish', () => { console.log("succesful upload"); resolve(filename) });

//         blobStream.end(image);
//     });
// }

// export const updateFirestoreDocAdmin = async function (path: string, data: any) {
//     const db = getFirestore(firebaseAdmin.app());
//     const docRef = db.doc(path);
//     const resp = await docRef.update(data);
//     return true;
// }