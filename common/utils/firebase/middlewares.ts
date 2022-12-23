import { auth } from "firebase-admin";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { NextRequestWithUid } from "../../types/next_types";
import { firebaseAdmin } from "./adminApp";
import nookies from 'nookies';

export function withAuth(handler: (req: NextRequestWithUid, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).end('Not authenticated. No Auth header');
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    let req_with_uid: any;
    try {
      decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
      if (!decodedToken || !decodedToken.uid) {
        return res.status(401).end('Not authenticated');
      }
      req_with_uid = req;
      req_with_uid.uid = decodedToken.uid; // add uid to req
      return handler(req_with_uid, res);
    } catch (error: any) {
      console.log(error.errorInfo);
      const errorCode = error.errorInfo.code;
      error.status = 401;
      if (errorCode === 'auth/internal-error') {
        error.status = 500;
      }
      //TODO handlle firebase admin errors in more detail
      return res.status(error.status).json({ error: errorCode });
    }

  };
}

export async function verifyAuthSSR(ctx: GetServerSidePropsContext) : Promise<string | undefined> {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // the user is authenticated!
    const uid = token['uid'];
    return uid;
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log(err);
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return undefined;
  }
}