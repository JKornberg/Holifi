import { Box, Button, Container, Typography } from "@mui/material"
import { doc, updateDoc } from "firebase/firestore";
import { signIn, useSession, signOut, getSession } from "next-auth/react"
import { Fragment, useEffect, useRef, useState } from "react";
import { TokenType } from "../common/types/misc_types";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from '../common/utils/firebase/clientApp'
import { Stack } from "@mui/system";
import NavBar from "../common/components/Header/Navbar";
import { useRouter } from "next/router";
import { sign } from "crypto";


type Props = {}

function disconnectTwitter(userId: string | null) {
    console.log("Disconnecting twitter");
    if (userId == null) {
        signOut();
        return;
    }
    updateDoc(doc(firestore, 'users', userId), { 'twitterId': "" }).then((res) => {
        console.log(res);
        signOut();
    }).catch((err) => {
        console.log(err);
    }
    )
}

const Profile = (props: Props) => {


    const { data } = useSession();
    const { loadingUser } = useAuth()
    const [updated, setUpdated] = useState(0);
    const [twitterId, setTwitterId] = useState(loadingUser?.user?.twitterId);
    const previousValues = useRef({ from: updated, to: twitterId });
const router = useRouter();
    const connectTwitter = async () =>{
        signIn('twitter', { callbackUrl: 'http://localhost:3000/' })
    }



    useEffect(() => {
        if (data == null) { return; };
        console.log(data.user);
        const id: string = data.user.access_token

        if (id != null && loadingUser.user != null) {
            updateDoc(doc(firestore, 'users', loadingUser.user.id), { 'twitterId': id });
        }
    }, [loadingUser?.user?.twitterId])



    return (
        <Fragment>

            <NavBar bg='black' p={4} />
            <Container maxWidth={'sm'} component="main" sx={{ marginTop: 5 }}>
                <Box component="div" textAlign='center'>
                    <Typography variant='h1'>Profile</Typography>
                    <Stack marginTop={5}>
                        {loadingUser.user?.twitterId ? <>

                            <Typography variant='body1'>Your Twitter account is connected!</Typography>
                            <Button onClick={() => disconnectTwitter(loadingUser.user?.id ?? null)}>Disconnect Twitter</Button>

                        </> :
                            <>
                                <Typography variant='body1'>You have not connected your Twitter account</Typography>

                                <Button onClick={() => connectTwitter()}>Add Twitter</Button>
                            </>}
                    </Stack>

                </Box>
            </Container>
        </Fragment>

    )

}

export default Profile