import { Button, FormControl, FormLabel, Stack, Link, Typography, Container, Box, TextField, CircularProgress, BottomNavigation, Input, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../common/hooks/useMounted'
import { useFormik } from 'formik'
import GoogleButton from 'react-google-button'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (loadingUser.isLoading) {
            setIsGoogleSubmitting(true);
        } else {
            setIsGoogleSubmitting(false);
        }
    }, [loadingUser.isLoading])

    useEffect(() => {
        if (loadingUser.user != null && loadingUser.isLoading == false) {
            router.push('/')
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
            setIsSubmitting(true);
            const res = await register(values.email, values.password, values.fname, values.lname);
            if (res.status == 200) {
                router.push('/');
            }
            setIsSubmitting(false);
            //router.push('/');
        },
        validate: values => {
            if (values.password !== values.confirmPassword) {
                return { 'confirmPassword': 'Passwords do not match' }
            } else if (values.password.length < 6) {
                return { 'password': 'Password must be at least 6 characters' }
            }
            return {}
        },
    });
    // 
    if (isGoogleSubmitting) {
        return (
            <Container maxWidth={'sm'}>
                <Box sx={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            </Container>
        )
    }
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
                        <OutlinedInput
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            placeholder='Password'
                            error={Boolean(formik.errors.confirmPassword)}
                            required
                            onChange={e => formik.setFieldValue('password', e.target.value)}
                        />
                        <FormHelperText>
                            {formik.errors.password}
                        </FormHelperText>
                    </FormControl>
                    <FormControl id='confirmPassword'>
                        <FormLabel>Confirm Password</FormLabel>
                        <OutlinedInput
                            name='confirmPassword'
                            type={showPassword ? 'text' : 'password'}

                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            placeholder='Confirm Password'
                            required
                            error={Boolean(formik.errors.confirmPassword) || Boolean(formik.errors.password)}
                            onChange={e => formik.setFieldValue('confirmPassword', e.target.value)}
                        />
                        <FormHelperText>
                            {formik.errors.confirmPassword}
                        </FormHelperText>
                    </FormControl>
                    {/* <PasswordField /> */}
                    <Box component='div' margin={'auto'}>
                        <Button
                            type='submit'
                            disabled={(isSubmitting) || Boolean(formik.errors.confirmPassword)}>
                            {isSubmitting ? <CircularProgress /> : "Sign Up"}
                        </Button>

                    </Box>

                    <Box display={'flex'} marginTop={5}>
                        <Box margin='0 auto' display={'inline-block'}>
                            <GoogleButton
                                onClick={() => {
                                    setIsGoogleSubmitting(true);
                                    signInWithGoogle
                                }}
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