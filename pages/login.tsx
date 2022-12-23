import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Link,
  Typography,
  Card,
  Snackbar,
  Alert,
  Container,
  Box,
  FormControlLabel,
  Checkbox,
  Grid,
  TextField,
  CircularProgress,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../common/hooks/useMounted'
import { useFormik, useFormikContext } from 'formik'
import { GoogleLogo } from '../public/icons8-google-48'
import { Logo } from '../common/components/Header/logo'

type Props = {}

const Login = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      // your login logic here
      setIsSubmitting(true)
      login(values.email, values.password)
        .then((x) => {
          if (x.status != 200) {
            setOpen(true)
            throw new Error(x.message)
          } else {
            new Promise((resolve) => setTimeout(() => resolve(x), 1000))
          }
        })
        .then((authUser) => router.push('/app'))
        .finally(() => {
          // setTimeout(() => {
          //   mounted.current && setIsSubmitting(false)
          //   console.log(mounted.current)
          // }, 1000)
          mounted.current && setIsSubmitting(false)
        })
        .catch((err) => {})
    },
  })

  const [loading, setLoading] = useState(true)

  const { login, loadingUser, signInWithGoogle } = useAuth()
  const mounted = useMounted()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [checked, setChecked] = React.useState(false)

  useEffect(() => {
    if (loadingUser.user != null && loadingUser.isLoading == false) {
      router.push('/app')
    } else if (loadingUser.isLoading == false) {
      setLoading(false)
    }
  }, [loadingUser])

  return (
    <Container maxWidth={'sm'} component='main'>
      <Snackbar open={open}>
        <Alert>'Credentials not valid.'</Alert>
      </Snackbar>

      {loading ? (
        //center circular progress
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Box
              component='div'
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}
            >
              <Box alignSelf={'center'}>
                <Logo />
              </Box>
              <Typography
                component='h1'
                variant='h5'
                marginBottom={'10px'}
                marginTop={'20px'}
                textAlign={'center'}
              >
                Sign in
              </Typography>
              <FormControl id='email' sx={{ marginBottom: '15px' }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='email'
                  label='Email Address'
                  autoComplete='email'
                  autoFocus
                  type='email'
                  onChange={(e) =>
                    formik.setFieldValue('email', e.target.value)
                  }
                />
              </FormControl>
              <FormControl id='password' sx={{ marginBottom: '15px' }}>
                <TextField
                  name='password'
                  type='password'
                  label='Password'
                  autoComplete='password'
                  fullWidth
                  required
                  onChange={(e) =>
                    formik.setFieldValue('password', e.target.value)
                  }
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    value='remember'
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    color='secondary'
                  />
                }
                label='Remember me'
              />
              <LoadingButton
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                loading={isSubmitting}
                type='submit'
              >
                Sign in
              </LoadingButton>
              <Stack alignItems={'center'}>
                <Link href='/forgot' variant='body2'>
                  Forgot password?
                </Link>
                <Link href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Stack>
            </Box>
          </form>
          <Box display={'flex'} marginTop={2}>
            <Box margin='0 auto' display={'inline-block'}>
              <Button
                sx={{
                  backgroundColor: 'transparent',
                  ':hover': {
                    backgroundColor: '#07091c',
                  },
                  margin: '5px auto 5px auto',
                  borderRadius: 50,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                variant='outlined'
                onClick={() => {
                  signInWithGoogle()
                }}
                startIcon={<GoogleLogo />}
              >
                <Typography color={'lightgrey'} marginLeft={1}>
                  Sign up with Google
                </Typography>
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  )
}

export default Login
