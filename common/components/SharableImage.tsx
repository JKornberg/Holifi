import { Box, Divider, Stack, Typography } from '@mui/material'
import { Logo } from './Header/logo'
import { lyricImageColors, lyricLogoColors } from '../../styles/theme'
import DOMPurify from 'dompurify'

export default function SharableImage(props: {
  showShareImage: any
  randomState: any
  formData: any
  songData: any
  Protagonists: any
}) {
  const { showShareImage, randomState, formData, songData, Protagonists } =
    props

  enum Holidays {
    'Christmas' = 0,
    'Hanukkah' = 1,
    'Kwanzaa' = 2,
    'New Years' = 3,
    '' = 4,
  }

  const sanitizedData = (data: any) => ({
    __html: DOMPurify.sanitize(data),
  })

  return (
    <Box
      id='ShareableContainer'
      margin='0 auto'
      height={'1920px'}
      width={'1080px'}
      display={showShareImage ? 'block' : 'none'}
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
          sx={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        >
          <Stack direction={'column'} height='100%'>
            <Box height={'7.66%'}>
              <Stack
                direction={'row'}
                sx={{ backgroundColor: lyricImageColors[randomState] }}
                justifyContent='start'
                alignItems={'center'}
              >
                <Logo
                  marginX={3}
                  width={'inherit'}
                  accent={lyricLogoColors[randomState]}
                />
                <Divider
                  orientation='vertical'
                  flexItem
                  style={{
                    width: '2px',
                    backgroundColor: '#000',
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
                    {Protagonists[formData['character']]} presents
                  </Typography>
                  <Typography
                    variant={'h1'}
                    fontSize='1.5rem'
                    display={'inline'}
                    sx={{
                      fontFamily: 'Open Sans',
                      letterSpacing: '0.1rem',
                    }}
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
                  dangerouslySetInnerHTML={sanitizedData(
                    songData.lyrics.substring(0, 1500)
                  )}
                ></Typography>
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
                {`Certified ${formData['naughtyTier']} ${
                  Holidays[formData['holiday']]
                } song @ holifimusic.com`}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
