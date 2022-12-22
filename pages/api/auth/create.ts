import { rejects } from "assert";
import { NextApiResponse } from "next";
import { FirebaseUserType, FormatUserType } from "../../../common/types/firebase_types";
import { NextRequestWithUid } from "../../../common/types/next_types";
import { firebaseAdmin } from "../../../common/utils/firebase/adminApp";
import { formatUser } from "../../../common/utils/firebase/firebase_helpers";

async function createUser(
    email: string,
    password: string,
    fname: string,
    lname: string): Promise<string> {
    console.log("Creating user");
    try {
        const userRecord = await firebaseAdmin.auth().createUser({
            email: email,
            emailVerified: false,
            password: password,
            displayName: fname + ' ' + lname,
            disabled: false,
        });
        // const firebaseUser: FirebaseUserType = {
        //     uid: userRecord.uid,
        //     email: email,
        //     fname: fname,
        //     lname: lname,
        // };
        console.log("Adding to firestore");
        // await firebaseAdmin.firestore().collection('users').doc(userRecord.uid).set(firebaseUser);
        console.log("Added to firestore");
        return userRecord.uid;
    }
    catch (error) {
        console.log("Error creating user: ", error);
        throw error;

    }
}

export default function handler(req: NextRequestWithUid, res: NextApiResponse) {
    return new Promise<void>(async (resolve, reject) => {
        console.log(req.body);
        const email = req.body.email as string;
        const password = req.body.password as string;
        const fname = req.body.fname as string;
        const lname = req.body.lname as string;
        const alreadyCreated = req.body.alreadyCreated as boolean;
        createUser(email, password, fname, lname).then((uid) => {
            res.status(200).json({ message: uid });
            resolve();
        }).catch((e) => {
            res.status(405).json({ message: e.message });
            resolve();
        });
    })
};