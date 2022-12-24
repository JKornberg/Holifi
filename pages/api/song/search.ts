import { NextApiResponse } from "next";
import { NextRequestWithUid } from "../../../common/types/next_types";
import fetch from 'isomorphic-unfetch';
import { withAuth } from "../../../common/utils/firebase/middlewares";
const handler = async (req: NextRequestWithUid, res: NextApiResponse) => {
    return new Promise<void>(async (resolve, reject) => {
        let body = JSON.parse(req.body);
        let artist = body.artist as string;
        let song = body.song as string;
        // console.log(body);
        // let url = `http://127.0.0.1:5000/song?artist=${artist}&title=${song}&holiday=${body.holiday}&protagonist=${body.protagonist}&niceScale=${body.niceScale}`
        let url = `https://holifi-backend-jkornberg-kornberg.vercel.app/song?artist=${artist}&title=${song}&holiday=${body.holiday}&protagonist=${body.protagonist}&niceScale=${body.niceScale}`
        // console.log(url);
        fetch(url)
            .then((response: any) => {
                // console.log(response.body);
                response.json().then((data: any) => {
                    // console.log(data);
                    if (data?.lyrics == '' || data?.lyrics == null){
                        res.status(400).json({error: "No lyrics found"});
                        resolve();
                    }
                    data.lyrics = data.lyrics.trim();
                    res.status(200).json(data);
                    resolve();
                })
            }

            );
    })
}
export default withAuth(handler);