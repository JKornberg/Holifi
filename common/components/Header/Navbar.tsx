import { FC, useState } from 'react'
import {
  Stack,
  Link,
  IconButton,
  Typography,
  Unstable_Grid2,
  Grid,
} from '@mui/material'
import { BsPersonCircle } from 'react-icons/bs'
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { getAuth } from 'firebase/auth'
import ProfileMenu from './ProfileMenu'
import useWindowSize from '../../hooks/useWindowSize'

interface Props {
  children?: React.ReactNode
}

const NavBar = (props: any) => {
  const width = useWindowSize()
  return (
    <>
      <Grid
        container
        width={'100%'}
        justifyContent='space-between'
        alignItems='center'
        {...props}
      >
        <Grid item xs={2} textAlign='left' marginLeft={'10px'}>
          <Link href='/'>
            <IconButton children={<AiOutlineHome />} />
          </Link>
        </Grid>
        <Grid item xs={6} textAlign='center'>
          <Typography color='white' variant='h1' fontSize={'4xl'}>
            HoliFi ❄️
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          textAlign='right'
          display='flex'
          alignItems='right'
          flexDirection={'column'}
          marginRight={'10px'}
        >
          <ProfileMenu />
        </Grid>
      </Grid>
    </>
  )
}

export default NavBar
