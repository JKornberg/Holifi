import { Typography } from "@mui/material"
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";


type Props = {}


const UpdatedAuth = (props: Props) => {


    const { loadingUser, setLoadingUser } = useAuth()
    const router = useRouter();

    useEffect(() => {
        router.push("/")
    })



    return (
       <Typography>TEST</Typography>

    )

}

export default UpdatedAuth