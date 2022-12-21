import { addDoc, collection, doc, DocumentData, DocumentReference, DocumentSnapshot, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getBlob, getBytes, getStorage, ref, uploadBytes, UploadResult, uploadString } from "firebase/storage";
import { firestore } from "./clientApp";
import { ConfigurationType, ItemType as ItemType, FirebaseUserType, FormatUserType, PartType, QuoteType } from "../../types/firebase_types";
import { Blob as BufferBlob } from "buffer";
import { Quote } from "../../classes/quote";
import { Part } from "../../classes/part";
import { v4 as uuidv4 } from 'uuid';
import { getAuth, User } from "firebase/auth";

export const updateFirestoreDoc = async function (path: string, data: any) {

    const db = getFirestore();
    const resp = updateDoc(doc(db, path), data);
    return resp;
}

export const loadFirebaseDoc = async function (path: string) {
    const db = getFirestore();
    const resp = await getDoc(doc(db, path));
    return resp;
}


export async function createUser(uid: string, data: any) {
    console.log("Adding user to database");
    
    setDoc(doc(firestore, "users", uid), data, { merge: true });
}

export async function retrieveUser(uid: string) {
    console.log("Retrieving user from database");
    const resp = await getDoc(doc(firestore, "users", uid));
    return resp.data();
}





export async function uploadModel(uid: string, file: File, quote: Quote) {
    //Upload model to firebase storage
    try {
        const uploadResult = await saveBlobToFirebase(file, 'models/' + uid + '/' + uuidv4() + file.type);
        return uploadResult?.ref.fullPath;
    } catch (e) {
        console.log("Error uploading model");
        console.log(e);
        return null;
    }
}

export const saveBlobToFirebase = async function (blob: Blob | ArrayBuffer, filename: string): Promise<UploadResult | null> {
    try {
        const storage = getStorage();
        const imageRef = ref(storage, filename);
        let resp = await uploadBytes(imageRef, blob);
        return resp;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export const removeBlobFromFirebase = async function (path: string) {
    try {
        const storage = getStorage();
        const imageRef = ref(storage, path);
        let resp = deleteObject(imageRef);
        return resp;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}



export const formatUser = async (user: User): Promise<FormatUserType> => {
    const decodedToken = await user.getIdTokenResult(/*forceRefresh*/ true);
    const { token, expirationTime, claims } = decodedToken;

    return {
        uid: user.uid,
        email: user.email ?? "",
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
        token,
        expirationTime,
        admin: claims.admin ? true : false,
        };
};

export function firebaseUserFromFormattedUser(formatUser: FormatUserType, fname: string, lname: string, twitterId : string): FirebaseUserType {
    return {
        uid: formatUser.uid,
        email: formatUser.email,
        fname: fname,
        lname: lname
    }
}
