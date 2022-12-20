import { addDoc, collection, doc, DocumentData, DocumentReference, DocumentSnapshot, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getBlob, getBytes, getStorage, ref, uploadBytes, UploadResult, uploadString } from "firebase/storage";
import { firestore } from "./clientApp";
import { ConfigurationType, ItemType as ItemType, FirebaseUserType, FormatUserType, PartType, QuoteType } from "../../types/firebase_types";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { BufferGeometry } from "three";
import { Blob as BufferBlob } from "buffer";
import { Quote } from "../../classes/quote";
import { Part } from "../../classes/part";
import { v4 as uuidv4 } from 'uuid';
import { saveModelThumbnail, saveModelThumbnailFromFile } from "../../../modules/quote/api/QuoteAPI";
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


export function firebaseDocumentToConfiguration(doc: DocumentSnapshot): ConfigurationType {
    let config: ConfigurationType = {
        processes: doc.data()?.processes,
        finishes: doc.data()?.finishes,
        shipments: doc.data()?.shipments,
        units: doc.data()?.units,
        prices : doc.data()?.prices
    }
    return config;
}

export function itemTypeFromFirebase(id: string, data: DocumentData | undefined): ItemType | null {
    // Convert firestore data to QuoteType
    // Inputs:
    // - id: string (firestore id)
    // - data: DocumentData | undefined (firestore data)
    // Outputs:
    // - quote: QuoteType | null (converted data)

    if (data == undefined) {
        return null;
    }
    let item: ItemType = {
        id: id,
        date: data.date,
        contentUrl: data.contentUrl,
        tweetUrl: data.tweetUrl,
        tweetText: data.tweetText
    }
      
    return item;
}


export function quoteTypeFromFirebase(id: string, data: DocumentData | undefined): QuoteType | null {
    // Convert firestore data to QuoteType
    // Inputs:
    // - id: string (firestore id)
    // - data: DocumentData | undefined (firestore data)
    // Outputs:
    // - quote: QuoteType | null (converted data)

    if (data == undefined) {
        return null;
    }
    let quote: QuoteType = {
        id: id,
        name: data.name,
        company: data.company ?? "",
        email: data.email,
        shipment: data.shipment,
        created: data.created,
        modified: data.modified,
        status: data.status,
        parts: data.parts.map((part: any) => {
            return {
                name: part.name ?? null,
                model_path: part.model_path ?? null,
                thumbnail_path: part.thumbnail_path ?? null,
                additional_files: part.additional_files ?? null,
                notes: part.notes ?? null,
                process: part.process ?? null,
                material: part.material ?? null,
                color: part.color ?? null,
                resolution: part.resolution ?? null,
                finish: part.finish ?? null,
                dimensions: part.dimensions ?? null,
                unit: part.unit ?? null,
                quantity: part.quantity ?? null,
                cost: part.cost ?? null,
                metricVolume: part.metricVolume ?? null,
                imperialVolume: part.imperialVolume ?? null,
            };
        })
    }
    return quote
}

export function quoteFromFirebase(id: string, data: DocumentData | undefined): Quote | null {
    // Convert firestore data to Quote class
    // Inputs:
    // - id: string (firestore id)
    // - data: DocumentData | undefined (firestore data)
    // Outputs:
    // - quote: Quote | null (Quote class object)

    const quote = quoteTypeFromFirebase(id, data);
    if (quote == null) {
        return null;
    }
    return new Quote({ quote: quote });
}

export async function createFirestoreQuote(uid: string, quote: Quote): Promise<DocumentReference> {
    console.log("Creating quote");
    const docRef = await addDoc(collection(firestore, "data/" + uid + "/quotes"), quote.toObjectForFirebase());
    return docRef;
}


// async function createFirestoreDraft(uid: string, filename: string) {
//     const docRef = await addDoc(collection(firestore, "data/" + uid + "/quotes"), {
//         name: filename,
//         process: 'SLS',
//         material: 'Nylon 11',
//         resolution: 'Standard',
//         shipment: 'Standard',
//         finish: 'Standard',
//         color: 'Gray',
//         thumbnail_path: '',
//         model_path: '',
//         created: new Date(),
//         modified: new Date()
//     });
//     return docRef;
// }

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



export const saveBase64JpegToFirebase = async function (image: string, filename: string): Promise<UploadResult> {
    const storage = getStorage();
    const imageRef = ref(storage, filename);
    return await uploadString(imageRef, image, 'base64', { contentType: 'image/jpeg' });
}

export const loadModelFromPath = async function (path: string): Promise<BufferGeometry> {
    const storage = getStorage();
    const imageRef = ref(storage, path);
    const bytes = await getBytes(imageRef);
    const loader = new STLLoader();
    const geometry = await loader.parse(bytes);
    return geometry;
}

export const loadImageFromPath = async function (path: string): Promise<string> {
    const storage = getStorage();
    const imageRef = ref(storage, path);
    const bytes = await getBytes(imageRef);
    return Buffer.from(bytes).toString('base64')
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
        lname: lname,
        twitterId: twitterId,
        active: true,
    }
}
