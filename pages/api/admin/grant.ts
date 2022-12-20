import { NextApiResponse } from "next";
import { NextRequestWithUid } from "../../../common/types/next_types";
import { firebaseAdmin } from "../../../common/utils/firebase/adminApp"


async function grantAdminRole(email: string, isGrant: boolean): Promise<void> {
    const user = await firebaseAdmin.auth().getUserByEmail(email);
    if (user.customClaims && (user.customClaims as any).admin === isGrant){
        return;
    }
    return firebaseAdmin.auth().setCustomUserClaims(user.uid, {admin: isGrant});
 }

export default function handler(req: NextRequestWithUid, res: NextApiResponse){
    const email = req.body.email as string;
    const isGrant = req.body.isGrant as boolean;
    grantAdminRole(email, isGrant).then(() => {
        res.status(200).json({message: "Success"});
    }).catch((e) => {
        res.status(400).json({error: e});
    });
}

