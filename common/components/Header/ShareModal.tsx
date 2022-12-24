import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'
import { Logo } from './logo'
import { red } from '@mui/material/colors'
import { toJpeg } from 'html-to-image'
import { useState } from 'react'

export default function ShareModal(props: {
  shareModal: any
  setShareModal: any
  shareImage: any
  songFile: any
  Protagonists: any
  songForm: any
  songData: any
}) {
  const {
    shareModal,
    setShareModal,
    shareImage,
    songFile,
    songData,
    Protagonists,
    songForm,
  } = props
  const [dataUrl, setDataUrl] = useState(null)
  return (
    <Modal
      open={shareModal}
      onClose={() => setShareModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        width={{ xs: '84%', sm: '50%', md: '30%' }}
        style={{
          backgroundColor: '#090c24',
          padding: 5,
          borderRadius: 10,
          position: 'relative',
          height: '90%',
        }}
      >
        <IconButton
          style={{ position: 'absolute', top: 0, right: 0 }}
          children={<AiOutlineCloseCircle />}
          onClick={() => setShareModal(false)}
        />
        <Typography
          id='modal-modal-title'
          variant='h6'
          textAlign={'center'}
          fontFamily='Montserrat'
          color='#ef5350'
        >
          Share
        </Typography>
        <Divider
          light={true}
          variant={'fullWidth'}
          style={{
            margin: '5px auto',
            width: '100%',
            backgroundColor: 'lightgrey',
            height: '0.5px',
            border: 'none',
          }}
        />
        <Box
          width={'100%'}
          height={'80%'}
          style={{
            backgroundPosition: 'top center',
            backgroundImage: `url(${shareImage})`,
            margin: '0 auto',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* <Box id='ShareableContainer'>
            <Box
              display={'flex'}
              margin={'0 auto'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              sx={{
                backgroundImage: 'url("/lyrics_bg2.png")',
                backgroundSize: 'cover',
              }}
              height={'426px'}
              width={'240px'}
            >
              <Box
                padding={1}
                height='100%'
                sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <Stack direction={'column'} height='100%'>
                  <Box height={'7.66%'}>
                    <Stack
                      direction={'row'}
                      height={'100%'}
                      sx={{ backgroundColor: '#090c24' }}
                      justifyContent='start'
                      alignItems={'center'}
                    >
                      <Box display={'block'} margin='5px' {...props}>
                        <Typography
                          variant='h1'
                          fontSize={'0.8rem'}
                          display={'inline'}
                        >
                          Holi
                        </Typography>
                        <Typography
                          fontSize={'0.8rem'}
                          variant='h1'
                          display={'inline'}
                          color={red[400]}
                        >
                          fi
                        </Typography>
                      </Box>
                      <Divider
                        orientation='vertical'
                        flexItem
                        style={{
                          width: '0.5px',
                          backgroundColor: '#fff',
                          border: 'none',
                        }}
                      />
                      <Stack textAlign={'center'} width={'100%'} marginY={2}>
                        <Typography
                          variant={'h2'}
                          fontSize='0.5rem'
                          display={'inline'}
                          sx={{ fontFamily: 'Sonsie One, cursive' }}
                        >
                          {Protagonists[songForm.values.protagonist]} presents
                        </Typography>
                        <Typography
                          variant={'h1'}
                          fontSize='0.5rem'
                          marginTop={'5px'}
                          letterSpacing={0.8}
                          display={'inline'}
                        >
                          {' '}
                          {songData.title} by someone
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <Box height='87%' overflow='hidden'>
                    <Stack height='100%'>
                      <OutlinedInput
                        fullWidth
                        multiline
                        disabled
                        maxRows={Infinity}
                        sx={{
                          overflow: 'hidden',
                          backgroundColor: 'rgba(0,0,0,0)',
                          textAlign: 'center',
                          '& .MuiOutlinedInput-input.Mui-disabled': {
                            WebkitTextFillColor: 'white',
                          },
                          '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0,0,0,0)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0,0,0,0)',
                          },
                          fontSize: '0.5rem',
                        }}
                        inputProps={{ style: { textAlign: 'center' } }}
                        value={songData.lyrics.substring(0, 800)}
                      />
                      <Typography textAlign={'center'} fontSize='0.5rem'>
                        ...
                      </Typography>
                    </Stack>
                  </Box>
                  <Box
                    sx={{ backgroundColor: '#090c24' }}
                    textAlign='center'
                    marginX={4}
                    height={'10%'}
                    alignItems='center'
                    display='flex'
                  >
                    <Typography
                      variant={'h1'}
                      fontSize='0.5rem'
                      display={'inline'}
                      fontWeight={'bold'}
                      letterSpacing={2}
                    >
                      Certified naughty Christmas song @ holifimusic.com
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box> */}
        </Box>
        <Button
          style={{
            display: 'block',
            margin: '20px auto',
          }}
          onClick={() => {
            // let element = document.getElementById('ShareableContainer')
            // toJpeg(element!, {
            //   quality: 0.95,
            //   canvasWidth: 240,
            //   canvasHeight: 426,
            // }).then(async (dataUrl: any) => {
            //   setDataUrl(dataUrl)
            //   const blob = await (await fetch(dataUrl)).blob()
            //   const file = new File([blob], 'image.jpeg', {
            //     type: 'image/jpeg',
            //   })
            // navigator.share({ url: dataUrl })
            navigator.share({
              title: 'HoliFi',
              text: 'Check out my HoliFi song!',
              files: [songFile],
              //   })
            })
          }}
        >
          <FiShare />
        </Button>
        {dataUrl != null && (
          <a download={'image.jpg'} href={dataUrl}>
            asdf
          </a>
        )}
      </Box>
    </Modal>
  )
}
