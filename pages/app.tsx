import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Button,
  Stack,
  FormControl,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  Slider,
  InputLabel,
  MenuItem,
  NativeSelect,
  Divider,
} from '@mui/material'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import MenuAppbar from '../common/components/Header/Appbar'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { green, grey, red } from '@mui/material/colors'
import { fontSize } from '@mui/system'
import useWindowSize from '../common/hooks/useWindowSize'
// Used to include thumbnail data for safely rendering user models on dashboard

enum Holidays {
  'Christmas' = 0,
  'Hanukkah' = 1,
  'Kwanzaa' = 2,
  'New Years' = 3,
  'Non-Denominational' = 4,
}
enum Protagonists {
  'Santa' = 0,
  'Rudolph' = 1,
  'Jesus' = 2,
  'Judah Macabee' = 3,
  'Moses' = 4,
  'The Grinch' = 5,
}

type SongDataType = {
  title: string
  lyrics: string
} | null

const Home = () => {
  // const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { loadingUser, setLoadingUser } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  let [validHoliday, setValidHoliday] = useState(true)
  let [validCharacter, setValidCharacter] = useState(true)
  let [validSong, setValidSong] = useState(true)
  let [validArtist, setValidArtist] = useState(true)

  const validate = (values: {
    artist: string
    song: string
    niceScale: number
    holiday: number
    protagonist: number
  }) => {
    let error = false
    if (values.artist == '') {
      setValidArtist(false)
      error = true
    } else {
      setValidArtist(true)
    }
    if (values.song == '') {
      setValidSong(false)
      error = true
    } else {
      setValidSong(true)
    }
    if (values.holiday == 0) {
      setValidHoliday(false)
      error = true
    } else {
      setValidHoliday(true)
    }
    if (values.protagonist == 0) {
      setValidCharacter(false)
      error = true
    } else {
      setValidCharacter(true)
    }
    return !error
  }

  const songForm = useFormik({
    initialValues: {
      artist: '',
      song: '',
      niceScale: 0,
      holiday: 0,
      protagonist: 0,
    },
    onSubmit: async (values) => {
      setIsSubmitting(true)
      console.log('sending')
      fetch('/api/song/search', {
        headers: { Authorization: 'Bearer ' + loadingUser.user?.token },
        method: 'POST',
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json().then((data) => {
              // console.log(data.lyrics);
              setSongData(data)
            })
          } else {
            res.json().then((data) => {
              console.log('Error getting song')
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setIsSubmitting(false)
          songForm.setFieldValue('holiday', songForm.values.holiday + 1)
          songForm.setFieldValue('protagonist', songForm.values.protagonist + 1)
        })

      // const res = await register(values.email, values.password, values.fname, values.lname);
      //router.push('/');
    },
  })

  useEffect(() => {
    // console.log(loadingUser.isLoading);
    // console.log(loadingUser.user);
    if (loadingUser.isLoading) {
      return
    } else if (!loadingUser.isLoading && !loadingUser.user) {
      // console.log("redirecting to login...");
      router.push('/login')
    }
  }, [loadingUser])

  const width = useWindowSize()
  let [dropDown, setDropDown] = useState<boolean>(false)
  let [sliderMargin, setSliderMargin] = useState<boolean>(false)
  useEffect(() => {
    if (width <= 650) {
      setSliderMargin(true)
      if (width <= 500) {
        setDropDown(true)
      } else {
        setDropDown(false)
      }
    } else {
      setSliderMargin(false)
      setDropDown(false)
    }
  }, [width])

  let [songData, setSongData] = useState<SongDataType>(null)
  let [naughtyLevel, setNaughtyLevel] = useState<number>(0)
  let [character, setCharacter] = useState<String>('')
  let [holiday, setHoliday] = useState<String>('')
  let buttonColor
  let buttonText
  switch (naughtyLevel) {
    case -2:
      buttonColor = red[500]
      buttonText = 'Ho Ho Ho 👹'
      break
    case -1:
      buttonColor = red[200]
      buttonText = 'Naughty'
      break
    case 0:
      buttonColor = '#fff'
      buttonText = 'Just right 😌'
      break
    case 1:
      buttonColor = green[300]
      buttonText = "Aren't you sweet"
      break
    case 2:
      buttonColor = green['A400']
      buttonText = "Santa's Little Helper 😇"
      break
  }

  return loadingUser.isLoading ? (
    <Container>
      <Box
        component='div'
        width='100%'
        margin={10}
        display='flex'
        alignItems={'center'}
        justifyContent='center'
      >
        <CircularProgress />
      </Box>{' '}
    </Container>
  ) : (
    <Fragment>
      <Head>
        <title>HoliFi❄️</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='stylesheet' href='/app_styles.css' />
        {/* <Link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Box component='div'>
        <MenuAppbar />
        {/* <Container maxWidth='md' sx={{backgroundColor:'#090c24'}}> */}
        <Container
          maxWidth='md'
          className='background_image'
          sx={{ backgroundColor: '#090c24' }}
        >
          <Box component='div' textAlign='center' paddingTop={3}>
            <Box margin='0 auto' marginTop={5} alignItems={'center'}>
              <Typography
                fontSize={'1.5rem'}
                fontFamily={'Montserrat'}
                marginBottom={'15px'}
              >
                General Options
              </Typography>
              <Stack
                direction={dropDown ? 'column' : 'row'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Box
                  margin={dropDown ? '0 0 0.5rem 0' : '0 1rem 0 0'}
                  minWidth={width <= 650 ? 225 : 300}
                >
                  <FormControl fullWidth>
                    <InputLabel
                      variant='outlined'
                      id='demo-radio-buttons-group-label'
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      Holiday
                    </InputLabel>
                    <Select
                      aria-labelledby='demo-radio-buttons-group-label'
                      name='radio-buttons-group'
                      label='Holiday'
                      sx={
                        validHoliday
                          ? {}
                          : {
                              '.MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ef5350',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                {
                                  borderColor: '#ef5350',
                                },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ef5350',
                              },
                            }
                      }
                      value={holiday}
                      onChange={(e) => {
                        songForm.setFieldValue('holiday', e.target.value)
                        setHoliday(e.target.value)
                        setValidHoliday(true)
                      }}
                    >
                      <MenuItem disabled value=''>
                        Holiday
                      </MenuItem>
                      <MenuItem value={1}>Christmas</MenuItem>
                      <MenuItem value={2}>Hanukkah</MenuItem>
                      <MenuItem value={3}>Kwanzaa</MenuItem>
                      <MenuItem value={4}>New Years</MenuItem>
                      <MenuItem value={5}>Non-Denominational</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  margin={dropDown ? '0.5rem 0 0 0' : '0 0 0 1rem'}
                  minWidth={width <= 650 ? 225 : 300}
                >
                  <FormControl fullWidth>
                    <InputLabel
                      variant='outlined'
                      id='demo-radio-buttons-group-label'
                      sx={{ alignItems: 'center', display: 'flex' }}
                    >
                      Character
                    </InputLabel>
                    <Select
                      aria-labelledby='demo-radio-buttons-group-label'
                      name='radio-buttons-group'
                      label='Character'
                      sx={
                        validCharacter
                          ? {}
                          : {
                              '.MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ef5350',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                {
                                  borderColor: '#ef5350',
                                },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ef5350',
                              },
                            }
                      }
                      value={character}
                      onChange={(e) => {
                        songForm.setFieldValue('protagonist', e.target.value)
                        setCharacter(e.target.value)
                        setValidCharacter(true)
                      }}
                    >
                      <MenuItem value='' disabled>
                        Character
                      </MenuItem>
                      <MenuItem value={1}>Santa Clause</MenuItem>
                      <MenuItem value={2}>Jesus Christ</MenuItem>
                      <MenuItem value={3}>Judah Maccabee</MenuItem>
                      <MenuItem value={4}>Moses</MenuItem>
                      <MenuItem value={5}>The Grinch</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
              <Box
                maxWidth={500}
                margin={sliderMargin ? '0 50px' : '0 auto'}
                marginY={5}
              >
                <Box>
                  <Typography fontFamily={'Montserrat'}>
                    {buttonText}
                  </Typography>
                </Box>
                <Slider
                  min={-2}
                  max={2}
                  step={1}
                  marks={[
                    { value: -2, label: 'Naughty' },
                    { value: -1, label: '' },
                    { value: 0, label: 'or' },
                    { value: 1, label: '' },
                    { value: 2, label: 'Nice' },
                  ]}
                  onChange={(e, value) => {
                    setNaughtyLevel(value as number)
                    songForm.setFieldValue('naughtyNice', value)
                  }}
                  defaultValue={0}
                />
              </Box>
            </Box>
            <Divider
              light={true}
              variant={'fullWidth'}
              style={{
                margin: '30px auto',
                width: '80%',
                backgroundColor: 'lightgrey',
                height: '0.5px',
                border: 'none',
              }}
            />
            <Box margin={'10px'}>
              {songData !== null ? (
                <Typography>Selected: {songData.title}</Typography>
              ) : (
                <Typography fontSize={'1.5rem'} fontFamily={'Montserrat'}>
                  Song Choice
                </Typography>
              )}
            </Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent='center'
            >
              <Box
                width={{ xs: '80%', sm: '40%' }}
                marginRight={sliderMargin ? 0 : 2.5}
                margin={sliderMargin ? '0 auto' : '0 2.5 0 0'}
              >
                <FormControl id='email' fullWidth>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='Artist'
                    sx={
                      validArtist
                        ? {}
                        : {
                            '.MuiOutlinedInput-notchedOutline': {
                              borderColor: '#ef5350',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#ef5350',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#ef5350',
                            },
                          }
                    }
                    label='Enter Artist Name'
                    autoFocus
                    onChange={(e) => {
                      songForm.setFieldValue('artist', e.target.value)
                      setValidArtist(true)
                    }}
                  />
                </FormControl>
              </Box>
              <Box
                width={{ xs: '80%', sm: '40%' }}
                margin={sliderMargin ? '0 auto' : '0 0 2.5 0'}
              >
                <FormControl id='email' fullWidth>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    sx={
                      validSong
                        ? {}
                        : {
                            '.MuiOutlinedInput-notchedOutline': {
                              borderColor: '#ef5350',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#ef5350',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#ef5350',
                            },
                          }
                    }
                    name='Song'
                    label='Enter Song Name'
                    onChange={(e) => {
                      songForm.setFieldValue('song', e.target.value)
                      setValidSong(true)
                    }}
                  />
                </FormControl>
              </Box>
            </Stack>
            <Button
              sx={{ backgroundColor: buttonColor }}
              style={{ marginBottom: 0 }}
              onClick={
                isSubmitting
                  ? () => {}
                  : async () => {
                      let isValid = validate(songForm.values)
                      if (isValid) {
                        setValidArtist(true)
                        setValidHoliday(true)
                        setValidSong(true)
                        setValidCharacter(true)
                        songForm.setFieldValue(
                          'holiday',
                          songForm.values.holiday - 1
                        )
                        songForm.setFieldValue(
                          'protagonist',
                          songForm.values.protagonist - 1
                        )
                        songForm.submitForm()
                      }
                    }
              }
            >
              {isSubmitting ? (
                <CircularProgress />
              ) : (
                <Typography>Generate Song 😊</Typography>
              )}
            </Button>
            {/* <Divider
              light={true}
              variant={'fullWidth'}
              style={{
                margin: '30px auto',
                width: '80%',
                backgroundColor: 'lightgrey',
                height: '0.5px',
                border: 'none',
              }}
            /> */}
          </Box>
        </Container>
        <Box
          sx={{
            backgroundImage: 'url("/snow_cabin4.jpg")',
          }}
          padding={10}
          marginTop={5}
          width='100%'
        >
          <Container>
            <Box mt={4} width={'100%'} minHeight='400px'>
              <TextField
                multiline
                maxRows={Infinity}
                fullWidth
                sx={{ color: 'fff', backgroundColor: 'rgba(	9, 12, 36, 0.5)' }}
                value={
                  songData !== null
                    ? songData.lyrics
                    : 'Lyrics will appear here'
                }
              />
            </Box>
          </Container>
        </Box>
      </Box>
    </Fragment>
  )
}

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const uid = await verifyAuthSSR(ctx);
//   if (uid == null) {

//     return {
//       props: {
//         data: null
//       }
//     }
//   }
//   console.log("Successfully Authenticated", uid)
//   // FETCH STUFF HERE!! 🚀
//   console.log("Trying to fetch: " + 'data/quotes/');
//   console.log("UID: " + uid)
//   const db = firebaseAdmin.firestore();
//   const itemObjects: ItemType[] = [];
//   const draftCollection = await db.collection("users/" + uid + "/data").get()
//   for (const doc of draftCollection.docs) {
//     const dataTypeResponse: ItemType | null = itemTypeFromFirebase(doc.id, doc.data());
//     if (dataTypeResponse != null) {
//       itemObjects.push(dataTypeResponse);
//     }
//   }
//   return {
//     props: {
//       data: JSON.parse(JSON.stringify(itemObjects))
//     }
//   }
// }

export default Home
