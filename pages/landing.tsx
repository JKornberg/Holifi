import { Button, Card, Divider, Typography } from "@mui/material"
import { green } from "@mui/material/colors"
import { Box } from "@mui/system"
import { useRouter } from "next/router"

//create landing page
const Landing = () => {

    const router = useRouter()

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundImage: 'url(/cabin_landing.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <Typography variant="h2">
                Welcome to holifi
            </Typography>
            <Typography variant="h6">
                Turn your favorite song lyrics into a fun holiday parody!
            </Typography>
            <Box sx={{ my: 2 , backgroundColor: "#fff", height: '5px'}} />
            <Button variant="contained" color="primary"
                onClick={() => router.push('/login')}
            >



                Join the Party
            </Button>
        </Card>
    )
}

export default Landing