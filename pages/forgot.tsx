import {
  Card,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../common/hooks/useMounted'
import { useFormik } from 'formik'

type Props = {}

const Forgot = (props: Props) => {
  const { forgotPassword, loadingUser } = useAuth()
  const mounted = useMounted()
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (loadingUser.user != null && loadingUser.isLoading == false) {
      router.push('/app')
    }
  }, [loadingUser.user])
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fname: '',
      lname: '',
      phone: '',
      company: '',
    },
    onSubmit: async (values) => {
      console.log(values)
      forgotPassword(values.email)
    },
  })
  return (
    <Container maxWidth={'sm'} sx={{ marginTop: 8 }}>
      <Typography variant='h1'>Forgot Password...</Typography>
      <Card sx={{ marginTop: 8 }}>
        <form>
          <Stack spacing='6'>
            <FormControl id='email'>
              <FormLabel>
                Enter your email associated with your account.
              </FormLabel>
              <Input
                name='email'
                type='email'
                autoComplete='on'
                placeholder='email@example.com'
                required
                onChange={(e) => formik.setFieldValue('email', e.target.value)}
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Stack>
              <Link href='/login'>Return to Login</Link>
            </Stack>
            {submitted ? (
              <Typography>
                Check your email for a password reset link...
              </Typography>
            ) : (
              <Button
                onClick={(e) => {
                  setSubmitted(true)
                  formik.submitForm()
                }}
              >
                Submit Email
              </Button>
            )}
          </Stack>
        </form>
      </Card>
    </Container>
  )
}

export default Forgot
