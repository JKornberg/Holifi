import { NextApiResponse } from "next";
import { NextRequestWithUid } from "../../../common/types/next_types";
import fetch from 'isomorphic-unfetch';
export default function handler(req: NextRequestWithUid, res: NextApiResponse) {
    return new Promise<void>(async (resolve, reject) => {
        const { spawn } = require('child_process');
        let body = JSON.parse(req.body);
        let artist = body.artist as string;
        let song = body.song as string;
        let python = spawn('python', ['get_lyrics.py', artist, song]);
        let dataToSend = '';
        // console.log(python.stdout)
        python.stdout.on('data', (data: any) => {
            console.log(data.toString());
            dataToSend += data.toString();
        });
        python.stderr.on('data', (data: any) => {
            console.log(data.toString());
            dataToSend += data.toString();
        });
        python.on('close', (code: any) => {
            // send data to browser
            res.status(200).json(dataToSend)
        });
    });

    // return res.status(200).json({ message: dataToSend})
    // let body = JSON.parse(req.body);
    // let artist = body.artist as string;
    // let song = body.song as string;
    // let baseurl = 'https://theaudiodb.com/api/v1/json/' + process.env.AUDIO_DB_API + '/searchtrack.php'
    // let url = baseurl + '?s=' + artist + '&t=' + song;
    // if (req.method === "POST") {

    //     // return new Promise<void>((resolve, reject) => {
    //     //     fetch(url).then((response : any) => {
    //     //         response.json().then((data: any) => {
    //     //             console.log(data);
    //     //             res.status(200).json(data);
    //     //             resolve();
    //     //         })
    //     //     });
    //     // })

    // }
    // else{
    //     res.status(405).json({message: "Method not allowed"});
    // }
    // // return new Promise<void>(async (resolve, reject) => {
    // //     console.log(req.body);
    // //     const email = req.body.email as string;
    // //     const password = req.body.password as string;
    // //     const fname = req.body.fname as string;
    // //     const lname = req.body.lname as string;
    // //     const alreadyCreated = req.body.alreadyCreated as boolean;

    // // })
};