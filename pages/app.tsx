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
  Modal,
  IconButton,
  OutlinedInput,
} from '@mui/material'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import MenuAppbar from '../common/components/Header/Appbar'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import { useFormik, validateYupSchema } from 'formik'
import { green, grey, red } from '@mui/material/colors'
import { fontSize } from '@mui/system'
import useWindowSize from '../common/hooks/useWindowSize'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Logo } from '../common/components/Header/logo'
import { FiShare } from 'react-icons/fi'
import ErrorModal from '../common/components/Header/ErrorModal'
// Used to include thumbnail data for safely rendering user models on dashboard
import { toJpeg } from 'html-to-image'
import ShareModal from '../common/components/Header/ShareModal'
import GeneralOptions from '../common/components/Header/GeneralOptions'
import html2canvas from 'html2canvas'
import { lyricImageColors, lyricLogoColors } from '../styles/theme'
const enum Holidays {
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

//generateImageWithLyrics
const generateImageWithLyrics = (
  lyrics: string,
  title: string,
  artist: string
) => {}

const Home = () => {
  // const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { loadingUser, setLoadingUser } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  let [validHoliday, setValidHoliday] = useState<boolean>(true)
  let [validCharacter, setValidCharacter] = useState<boolean>(true)
  let [validSong, setValidSong] = useState<boolean>(true)
  let [validArtist, setValidArtist] = useState<boolean>(true)
  let [fetchError, setFetchError] = useState<boolean>(false)
  let [shareModal, setShareModal] = useState<boolean>(false)
  let [shareImage, setShareImage] = useState<String>('')
  let [showShareImage, setShowShareImage] = useState<boolean>(false)
  let [songFile, setSongFile] = useState<File | null>(null)
  let [randomState, setRandomState] = useState<number>(4)
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
            setFetchError(true)
          }
        })
        .catch((err) => {
          setFetchError(true)
          console.log(err)
        })
        .finally(() => {
          setIsSubmitting(false)
          // setRandomState(Math.floor(Math.random() * 5))
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

  useEffect(() => {
    if (showShareImage) {
      setShareModal(true)
      let element = document.getElementById('ShareableContainer')
      if (element == null) {
        return
      }
      window.scrollTo(0, 0)

      html2canvas(element, {
        scale: 1,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      }).then(async (canvas) => {
        let dataUrl = canvas.toDataURL()
        setShareImage(dataUrl)
        const blob = await (await fetch(dataUrl)).blob()
        const file = new File([blob], 'image.jpeg', { type: 'image/jpeg' })
        setSongFile(file)
      })
    }
    setShowShareImage(false)
  }, [showShareImage])

  let [songData, setSongData] = useState<SongDataType>({
    lyrics: 'test',
    title: 'test ',
  })
  let [naughtyLevel, setNaughtyLevel] = useState<number>(0)
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
      </Head>
      <Box component='div'>
        <ErrorModal setFetchError={setFetchError} fetchError={fetchError} />
        <ShareModal
          setShareModal={setShareModal}
          shareModal={shareModal}
          shareImage={shareImage}
          songFile={songFile}
          Protagonists={Protagonists}
          songForm={songForm}
          songData={songData}
        />
        <MenuAppbar />
        <Container
          maxWidth='md'
          className='background_image'
          style={{ overflow: 'hidden' }}
          sx={{
            backgroundColor: 'rgba(9, 12, 36, 0.6)',
          }}
        >
          <Box component='div' textAlign='center' paddingTop={3}>
            <GeneralOptions
              dropDown={dropDown}
              width={width}
              validHoliday={validHoliday}
              validCharacter={validCharacter}
              setValidCharacter={setValidCharacter}
              setValidHoliday={setValidHoliday}
              songForm={songForm}
              sliderMargin={sliderMargin}
              buttonText={buttonText}
              setNaughtyLevel={setNaughtyLevel}
            />
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
          </Box>
        </Container>
        <Box width='100%' textAlign={'end'}>
          <Button
            onClick={() => {
              setShowShareImage(true)
            }}
          >
            Share
          </Button>
        </Box>
      </Box>
      {songData?.lyrics == null ? (
        <Box></Box>
      ) : (
        <Box
          id='ShareableContainer'
          margin='0 auto'
          height={'1920px'}
          width={'1080px'}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            sx={{
              backgroundImage: `url("/lyrics_bg${randomState}.jpg")`,
              backgroundSize: 'cover',
            }}
            height={'1920px'}
            width={'1080px'}
          >
            <Box
              padding={5}
              height='100%'
              sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <Stack direction={'column'} height='100%'>
                <Box height={'7.66%'}>
                  <Stack
                    direction={'row'}
                    sx={{ backgroundColor: lyricImageColors[randomState] }}
                    justifyContent='start'
                    alignItems={'center'}
                  >
                    <Logo marginX={3} width={'inherit'} accent={lyricLogoColors[randomState]}/>
                    {/* <Typography variant={'h1'} fontSize='4rem' display={'inline'} marginX={5}>Holifi</Typography> */}
                    <Divider
                      orientation='vertical'
                      flexItem
                      style={{
                        width: '2px',
                        backgroundColor: '#fff',
                        border: 'none',
                      }}
                    />
                    <Stack
                      textAlign={'center'}
                      width={'100%'}
                      marginX={5}
                      marginY={2}
                    >
                      <Typography
                        variant={'h1'}
                        fontSize='2.5rem'
                        display={'inline'}
                        sx={{ fontFamily: 'Comfortaa' }}
                      >
                        {Protagonists[songForm.values.protagonist]} presents
                      </Typography>
                      <Typography
                        variant={'h1'}
                        fontSize='1.5rem'
                        display={'inline'}
                        sx={{ fontFamily: 'Open Sans', letterSpacing: '0.1rem'}}
                      >
                        {' '}
                        {songData.title}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
                <Box height='87%' marginTop='30px' overflow='hidden'>
                  <Stack height='100%'>
                    <Typography
                      display='block'
                      fontSize='2rem'
                      textAlign='center'
                      whiteSpace='pre-line'
                      overflow={'hidden'}
                      dangerouslySetInnerHTML={{__html: songData.lyrics.substring(0,1500)}}
                    >
                    </Typography>
                    <Typography textAlign={'center'} fontSize='2rem'>
                      ...
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{ backgroundColor: lyricImageColors[randomState] }}
                  textAlign='center'
                  marginX={4}
                  height={'10%'}
                  alignItems='center'
                  display='flex'
                >
                  <Typography variant={'h1'} fontSize='4rem' display={'inline'}>
                    Certified naughty Christmas song @ holifimusic.com
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      )}
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
