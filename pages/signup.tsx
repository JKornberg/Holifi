import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  Link,
  Typography,
  Container,
  Box,
  TextField,
  SvgIcon,
  Divider,
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../common/hooks/useMounted'
import { useFormik } from 'formik'
import { GoogleLogo } from '../public/icons8-google-48.js'
import { Logo } from '../common/components/Header/logo'

type Props = {}

const validateConfirmPassword = (
  pass: string,
  value: string,
  isOriginal: boolean
) => {
  let error = ''
  if (pass && value) {
    if (pass !== value) {
      error = 'Password not matched'
    }
  }
  return error
}

const Signup = (props: Props) => {
  const { register, loadingUser, signInWithGoogle } = useAuth()
  const mounted = useMounted()
  const router = useRouter()

  useEffect(() => {
    if (loadingUser.user != null && loadingUser.isLoading == false) {
      router.push('/app')
    }
  }, [loadingUser.user])
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fname: '',
      lname: '',
    },
    onSubmit: async (values) => {
      const res = await register(
        values.email,
        values.password,
        values.fname,
        values.lname
      )
      //router.push('/');
    },
    validate: (values) => {
      let res: any = {}
      if (values.password !== values.confirmPassword) {
        res['confirmPassword'] = 'Passwords do not match'
      }
      if (values.password.length < 6) {
        res['password'] = 'Password must be at least 6 characters'
      }

      return res
    },
  })
  //
  return (
    <Container maxWidth={'sm'}>
      <form onSubmit={formik.handleSubmit}>
        <Stack sx={{ marginTop: 2 }}>
          <Box alignSelf={'center'}>
            <Logo />
          </Box>
          <Box display={'flex'} marginTop={1} marginBottom={1}>
            <Box margin='0 auto' display={'inline-block'}>
              <Button
                sx={{
                  backgroundColor: 'transparent',
                  ':hover': {
                    backgroundColor: '#07091c',
                  },
                  margin: '30px auto 5px auto',
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
          <Stack direction='row' alignContent={'center'} alignItems={'center'}>
            <Divider
              light={true}
              variant={'fullWidth'}
              style={{
                margin: '20px 15px 20px auto',
                width: '35%',
                backgroundColor: 'lightgrey',
                height: '0.5px',
                border: 'none',
              }}
            />
            <Typography>or</Typography>
            <Divider
              light={true}
              variant={'fullWidth'}
              style={{
                margin: '20px auto 20px 15px',
                width: '35%',
                backgroundColor: 'lightgrey',
                height: '0.5px',
                border: 'none',
              }}
            />
          </Stack>
          <Typography
            style={{ fontSize: '1.3rem' }}
            variant='h5'
            textAlign={'center'}
            marginTop={'10px'}
            marginBottom={'20px'}
          >
            Sign up with your email address
          </Typography>
          <FormControl id='fname'>
            <TextField
              name='fname'
              type='text'
              label='First Name'
              placeholder='John'
              autoComplete='on'
              required
              onChange={(e) => formik.setFieldValue('fname', e.target.value)}
            />
          </FormControl>
          <FormControl id='lname' sx={{ margin: '20px 0 5px 0' }}>
            <TextField
              name='lname'
              type='text'
              label='Last Name'
              placeholder='Doe'
              autoComplete='on'
              required
              onChange={(e) => formik.setFieldValue('lname', e.target.value)}
            />
          </FormControl>
          <FormControl id='email' sx={{ margin: '20px 0 5px 0' }}>
            <TextField
              name='email'
              type='email'
              autoComplete='on'
              label='Email Address'
              placeholder='email@example.com'
              required
              onChange={(e) => formik.setFieldValue('email', e.target.value)}
            />
          </FormControl>
          <FormControl id='password' sx={{ margin: '20px 0 5px 0' }}>
            <TextField
              name='password'
              type='password'
              placeholder='********'
              label='Password'
              error={Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              required
              onChange={(e) => formik.setFieldValue('password', e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ margin: '20px 0 5px 0' }} id='confirmPassword'>
            <TextField
              name='confirmPassword'
              type='password'
              label='Confirm Password'
              placeholder='********'
              required
              error={Boolean(formik.errors.confirmPassword)}
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              onChange={(e) =>
                formik.setFieldValue('confirmPassword', e.target.value)
              }
            />
          </FormControl>
          {/* <PasswordField /> */}
          <Box component='div' margin={'auto'}>
            <Button type='submit'>Sign Up</Button>
          </Box>

          <Link margin='0 auto 30px auto' href='/login'>
            Already have an account? Sign In
          </Link>
        </Stack>
      </form>
    </Container>
  )
}

export default Signup
