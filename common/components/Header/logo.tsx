import { Box, Typography } from "@mui/material"
import { red } from "@mui/material/colors"


export const Logo = () => {
    return (
        <Box display={'block'} width='100%' margin='0 auto'>
        <Typography variant='h1' display={'inline'}>holi</Typography>
        <Typography variant='h1' display={'inline'} color={red[400]}>fi</Typography>
        </Box>

    )
    }