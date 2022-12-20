import { NextApiRequest } from "next";

export type NextRequestWithUid = NextApiRequest & {uid : string};