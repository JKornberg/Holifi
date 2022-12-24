import { Box, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { BoxProps } from '@mui/system'
import React from 'react'

type LogoProps = BoxProps & { accent?: string }

export const Logo = (props: LogoProps) => {
    return (
        <Box display={'block'} width='100%' margin='0 auto' {...props}>
            <Typography variant='h1' display={'inline'}>Holi</Typography>
            <Typography variant='h1' display={'inline'} color={props.accent ?? red[400]}>fi</Typography>
        </Box>

    )
}
