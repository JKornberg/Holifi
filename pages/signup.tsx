import { Button, FormControl, FormLabel, Stack, Link, Typography, Container, Box, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../common/hooks/useMounted'
import { useFormik } from 'formik'
import GoogleButton from 'react-google-button'

type Props = {}

const validateConfirmPassword = (pass: string, value: string, isOriginal: boolean) => {

    let error = "";
    if (pass && value) {
        if (pass !== value) {
            error = "Password not matched";
        }
    }
    return error;
};

const Signup = (props: Props) => {

    const { register, loadingUser, signInWithGoogle } = useAuth();
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
        }, onSubmit: async values => {
            const res = await register(values.email, values.password, values.fname, values.lname);
            //router.push('/');
        },
        validate: values => {
            if (values.password !== values.confirmPassword) {
                return { 'confirmPassword': 'Passwords do not match' }
            }
            return {}
        },
    });
    //
    return (
        <Container maxWidth={'sm'}>
            <form onSubmit={formik.handleSubmit}>
                <Stack sx={{ marginTop: 8 }}>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <FormControl id='fname'>
                        <FormLabel>First Name</FormLabel>

                        <TextField
                            name='fname'
                            type='text'
                            autoComplete='on'
                            placeholder='John'
                            required
                            onChange={e => formik.setFieldValue('fname', e.target.value)}
                        />
                    </FormControl>
                    <FormControl id='lname'>
                        <FormLabel>Last Name</FormLabel>
                        <TextField
                            name='lname'
                            placeholder='Doe'
                            type='text'
                            autoComplete='on'
                            required
                            onChange={e => formik.setFieldValue('lname', e.target.value)}
                        />
                    </FormControl>

                    <FormControl id='email'>
                        <FormLabel>Email address</FormLabel>
                        <TextField
                            name='email'
                            type='email'
                            autoComplete='on'
                            placeholder='email@example.com'
                            required
                            onChange={e => formik.setFieldValue('email', e.target.value)}
                        />
                    </FormControl>

                    <FormControl id='password'>
                        <FormLabel>Password</FormLabel>
                        <TextField
                            name='password'
                            type='password'
                            placeholder='Password'
                            required
                            onChange={e => formik.setFieldValue('password', e.target.value)}
                        />
                    </FormControl>
                    <FormControl id='confirmPassword'>
                        <FormLabel>Confirm Password</FormLabel>
                        <TextField
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirm Password'
                            required
                            error={Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            onChange={e => formik.setFieldValue('confirmPassword', e.target.value)}
                        />
                    </FormControl>
                    {/* <PasswordField /> */}
                    <Box component='div' margin={'auto'}>
                        <Button
                            type='submit'
                        >
                            Sign Up
                        </Button>

                    </Box>

                    <Box display={'flex'} marginTop={5}>
                        <Box margin='0 auto' display={'inline-block'}>
                            <GoogleButton
                                onClick={() => { signInWithGoogle }}
                            />
                        </Box>
                    </Box>
                    <Link margin='auto' href='/login'>Already have an account? Sign In</Link>

                </Stack>
            </form>

        </Container>
    )
}

export default Signup