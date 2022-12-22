import { Button, FormControl, FormLabel, Stack, Input, Link, Typography, Card, Snackbar, Alert, Container, Box, FormControlLabel, Checkbox, Grid, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../common/hooks/useMounted'
import { useFormik, useFormikContext } from 'formik'
import GoogleButton from 'react-google-button'

type Props = {}

const Login = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, onSubmit: async values => {
      // your login logic here
      setIsSubmitting(true);
      login(values.email, values.password)
        .then(x => {
          if (x.status != 200) {
            setOpen(true);
            throw new Error(x.message)
          }
          else {
            new Promise(resolve => setTimeout(() => resolve(x), 1000))
          }
        })
        .then(authUser => router.push("/"))
        .finally(() => {
          // setTimeout(() => {
          //   mounted.current && setIsSubmitting(false)
          //   console.log(mounted.current)
          // }, 1000)
          mounted.current && setIsSubmitting(false)
        })
        .catch(err => {
        })
    }
  });
  const { login, loadingUser, signInWithGoogle } = useAuth();
  const mounted = useMounted()
  const router = useRouter()
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);


  useEffect(() => {
    if (loadingUser.user != null && loadingUser.isLoading == false) {
      router.push('/')
    }
  }, [loadingUser.user])

  return (
    <Container maxWidth={'sm'} component="main"><Snackbar open={open}><Alert>'Credentials not valid.'</Alert></Snackbar>
      <form onSubmit={formik.handleSubmit}>
        <Box
          component="div"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <FormControl id='email'>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label='Email Address'
              autoComplete="email"
              autoFocus
              type='email'
              onChange={e => formik.setFieldValue('email', e.target.value)}
            />
          </FormControl>
          <FormControl id='password'>
            <TextField
              name='password'
              type='password'
              label='Password'
              autoComplete='password'
              fullWidth
              required
              onChange={e => formik.setFieldValue('password', e.target.value)}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" checked={checked}
              onChange={(e) => setChecked(e.target.checked)} color="secondary" />}

            label="Remember me"
          />
          <LoadingButton
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isSubmitting}
            type='submit'
          >
            Sign in
          </LoadingButton>
          <Stack>
            <Link href="/forgot" variant="body2">
              Forgot password?
            </Link>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Stack>
        </Box>
      </form>
      <Box display={'flex'} marginTop={5}>
        <Box margin='0 auto' display={'inline-block'}>
          <GoogleButton
            onClick={() => { signInWithGoogle()}}
          />
        </Box>
      </Box>


    </Container>
  )
}

export default Login