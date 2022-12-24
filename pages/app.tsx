import {
  CircularProgress,
  Container,
  Box,
  Button,
  TextField,
  Divider,
  Typography,
  OutlinedInput,
} from '@mui/material'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import MenuAppbar from '../common/components/Header/Appbar'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import { useFormik, validateYupSchema } from 'formik'
import { green, grey, red } from '@mui/material/colors'
import useWindowSize from '../common/hooks/useWindowSize'
import ErrorModal from '../common/components/Header/ErrorModal'
import ShareModal from '../common/components/Header/ShareModal'
import GeneralOptions from '../common/components/Header/GeneralOptions'
import SongOptions from '../common/components/Header/SongOptions'
import GenerateButton from '../common/components/Header/GenerateButton'
import SharableImage from '../common/components/SharableImage'
// Used to include thumbnail data for safely rendering user models on dashboard
import html2canvas from 'html2canvas'
import DisplayedImage from '../common/components/DisplayedImage'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { ConsoleView } from 'react-device-detect'

type SongDataType = {
  title: string
  lyrics: string
} | null

type formDataType = {
  artist: string
  song: string
  character: number
  holiday: number
  naughtyTier: string
}

enum Protagonists {
  'Santa Clause' = 0,
  'Jesus Christ' = 1,
  'Judah Macabee' = 2,
  'Moses' = 3,
  'The Grinch' = 4,
}

const Home = () => {
  // Vars
  const router = useRouter()
  const { loadingUser, setLoadingUser } = useAuth()
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
  let [randomState, setRandomState] = useState<number>(0)
  let [formData, setFormData] = useState<formDataType>({
    song: '',
    artist: '',
    character: -1,
    holiday: -1,
    naughtyTier: '',
  })
  const width = useWindowSize()
  let [dropDown, setDropDown] = useState<boolean>(false)
  let [sliderMargin, setSliderMargin] = useState<boolean>(false)
  // let [songData, setSongData] = useState<SongDataType>({
  //   title: 'Really long test name by really long artist yea yea yea yea',
  //   lyrics: `Lipstick junkie
  // Debunked the all in one
  // She came back wearing a smile
  // Looking like someone drugged me
  // That wanted to unplug me
  // No one here is on trial
  // It's just a turnaround
  // And we go, oh
  // Well, then we go uh, uh, uh, uh
  // Tick-tock, I want to rock you like the '80s
  // Cock blocking isn't allowed
  // Tugboat Sheila is into memorabilia
  // Who said three is a crowd
  // We better get it on the go
  // Hey now
  // We've got to make it rain somehow
  // She told me to
  // And showed me what to do
  // How Maggie makes it in her cloud
  // I said, hey now
  // We've got to make it rain somehow
  // She told me to
  // And showed me what to do
  // She knows how to make it loud
  // Rain dance Maggie
  // Advances to the final
  // Who knew that she had the goods
  // Little did I know
  // Her body was one delicious vinyl
  // To your neck of the woods
  // I want to lick a little bit
  // Hey now
  // We've got to make it rain somehow
  // She told me to
  // And showed me what to do
  // How Maggie makes it in her cloud
  // We've got the wrong girl
  // But not for long, girl
  // It's in the song, girl
  // 'Cause I'll be gone, girl
  // Hey now
  // We've got to make it rain somehow
  // She told me to
  // And showed me what to do
  // How Maggie makes it in her cloud
  // I said, hey now
  // I want to rock this rowdy crowd
  // She told me to
  // And showed me what to do
  // She knows how to make it loud
  // But not for long, girl
  // It's in the song, girl
  // 'Cause I'll be gone, bye-bye-bye, yeah
  // Bye-bye-bye, girl
  // Bye-bye, girl
  // Bye-bye, girl
  // Bye-bye
  // `,
  // })
  let [songData, setSongData] = useState<SongDataType>(null)
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

  // Functions
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
      console.log(values)
      setIsSubmitting(true)
      console.log('Fetching Holified Song...')
      fetch('/api/song/search', {
        headers: { Authorization: 'Bearer ' + loadingUser.user?.token },
        method: 'POST',
        body: JSON.stringify(values),
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json().then((data) => {
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
          let niceLevel = ''
          switch (songForm.values.niceScale) {
            case -2:
              niceLevel = 'Naughty'
              break
            case -1:
              niceLevel = 'Naughty'
              break
            case 0:
              niceLevel = ''
              break
            case 1:
              niceLevel = 'Nice'
              break
            case 2:
              niceLevel = 'Nice'
              break
          }
          setFormData({
            song: songForm.values.song,
            artist: songForm.values.artist,
            character: songForm.values.protagonist,
            holiday: songForm.values.holiday,
            naughtyTier: niceLevel,
          })
          setRandomState(Math.floor(Math.random() * 5))
          songForm.setFieldValue('holiday', songForm.values.holiday + 1)
          songForm.setFieldValue('protagonist', songForm.values.protagonist + 1)
        })
    },
  })

  // Use Effects
  useEffect(() => {
    if (loadingUser.isLoading) {
      return
    } else if (!loadingUser.isLoading && !loadingUser.user) {
      router.push('/login')
    }
  }, [loadingUser])

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

  return loadingUser.isLoading ? (
    <Container>
      <Box
        component='div'
        width='100%'
        paddingTop={10}
        margin={0}
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
      {/* ------------------- Modals ------------------- */}
      <ErrorModal setFetchError={setFetchError} fetchError={fetchError} />
      <ShareModal
        setShareModal={setShareModal}
        shareModal={shareModal}
        shareImage={shareImage}
        songFile={songFile}
        songData={songData}
      />
      <Box component='div' textAlign={'center'}>
        {/* ------------------- Navbar  ------------------- */}
        <MenuAppbar />
        {/* ----------------- Navbar End------------------- */}

        {/* ------------------- Options  ------------------- */}
        <Container
          maxWidth='md'
          className='background_image'
          style={{ overflow: 'hidden' }}
          sx={{
            backgroundColor: 'rgba(9, 12, 36, 0.6)',
            paddingBottom: 2,
          }}
        >
          <Box component='div' textAlign='center' paddingTop={1}>
            {/* ------------------- General Options  ------------------- */}
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
            {/* ------------------ General Options End ------------------ */}
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
            {/* ------------------- Song Options  ------------------- */}
            <SongOptions
              songData={songData}
              sliderMargin={sliderMargin}
              songForm={songForm}
              setValidArtist={setValidArtist}
              validArtist={validArtist}
              validSong={validSong}
              setValidSong={setValidSong}
            />
            {/* ---------------- Song Options End ------------------- */}
            {/* ------------------- Options End -=---------------------- */}
            {/* --------------- Generate Lyrics Button  ------------ */}
            <GenerateButton
              isSubmitting={isSubmitting}
              setValidArtist={setValidArtist}
              setValidHoliday={setValidHoliday}
              setValidSong={setValidSong}
              setValidCharacter={setValidCharacter}
              songForm={songForm}
              validate={validate}
              buttonColor={buttonColor}
            />
            {/* ------------- Generate Lyrics Button End -------------   */}
          </Box>
          {/* ------------------- Share Button  ------------------- */}
          {songData?.lyrics == null ? (
            <></>
          ) : (
            <Button
              onClick={() => {
                setShowShareImage(true)
              }}
            >
              Share
            </Button>
          )}
          {/* --------------- Share Button End  -------------- */}
        </Container>
      </Box>
      {/* ---------------  Sharable Image  -------------- */}
      {songData?.lyrics == null ? (
        <Box></Box>
      ) : (
        <SharableImage
          Protagonists={Protagonists}
          showShareImage={showShareImage}
          randomState={randomState}
          formData={formData}
          songData={songData}
        />
      )}
      {/* ------------  Sharable Image End -------------- */}
      {/* --------------- Lyrics Display  -------------- */}
      {songData?.lyrics == null ? (
        <Box></Box>
      ) : (
        <Box
          width='100%'
          height='100%'
          sx={{
            backgroundColor: '#000',
            backgroundImage: 'url("/snow_cabin.jpg")',
            backgroundSize: 'cover',
          }}
          paddingY={5}
        >
          <DisplayedImage
            Protagonists={Protagonists}
            showShareImage={showShareImage}
            randomState={randomState}
            formData={formData}
            songData={songData}
          />
        </Box>
      )}
      {/* --------------- Lyrics Display End  -------------- */}
      <Box
        width='100%'
        sx={{
          backgroundColor: '#e57373',
          backgroundImage:
            'linear-gradient(45deg, #ef5350 25%, transparent 25.5%, transparent 50%, #ef5350 50.5%, #ef5350 75%, transparent 75.5%, transparent)',
          backgroundSize: '50px 50px',
        }}
        textAlign='center'
        borderTop={'solid'}
        borderColor='#07091c'
      >
        <Box
          maxWidth={'100%'}
          margin={'0 auto'}
          sx={{ backgroundColor: 'rgba(9,12,36,0.5)' }}
          padding={4}
        >
          <Typography fontSize={{ xs: '0.85rem', sm: '1rem', md: '1.2rem' }}>
            50% of your donations go towards buying presents for kids without
            them this Christmas. And the other bit goes towards keeping this
            site awesome!
          </Typography>
          <Button
            component={Link}
            sx={{ backgroundColor: '090c24', color: '#fff' }}
            href='https://pages.donately.com/holifi/form/frm_a552681b1929'
          >
            Donate
          </Button>
          <Typography fontSize={{ xs: '0.85rem', sm: '1rem', md: '1.2rem' }}>
            Made with ❤️ by Jonah & Grayson Kornberg, in collaboration with Tech
            & Mech USA.
          </Typography>
        </Box>
      </Box>
    </Fragment>
  )
}

export default Home
