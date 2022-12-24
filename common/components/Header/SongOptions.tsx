import { Typography, Box, Stack, FormControl, TextField } from '@mui/material'

export default function SongOptions(props: {
  songData: any
  sliderMargin: any
  songForm: any
  setValidArtist: any
  validArtist: any
  validSong: any
  setValidSong: any
}) {
  const {
    songData,
    sliderMargin,
    songForm,
    setValidArtist,
    validArtist,
    validSong,
    setValidSong,
  } = props
  return (
    <>
      <Box margin={'10px'}>
        {songData !== null ? (
          <Typography>Selected: {songData.title}</Typography>
        ) : (
          <Typography fontSize={'1.5rem'} fontFamily={'Montserrat'}>
            Song Choice
          </Typography>
        )}
      </Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='center'>
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
    </>
  )
}
