import { Box, Divider, Stack, Typography } from '@mui/material'
import { Logo } from './Header/logo'
import { lyricImageColors, lyricLogoColors } from '../../styles/theme'
import { red } from '@mui/material/colors'
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
      height={{ xs: '700px', sm: '700px', md: '700px' }}
      width={{ xs: '300px', sm: '580px', md: '720px' }}
      marginBottom={'20px'}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        margin={'0 auto'}
        sx={{
          backgroundImage: `url("/lyrics_bg${randomState}.jpg")`,
          backgroundSize: 'cover',
          border: 'solid',
          borderWidth: '4px',
          borderColor: lyricImageColors[randomState],
        }}
        height={'100%'}
        width={'100%'}
      >
        <Box
          padding={{ xs: 1, sm: 2, md: 2 }}
          height='100%'
          sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <Stack direction={'column'} height='100%'>
            <Box width={'100%'} height={{ sm: '12%', md: '15%' }}>
              <Stack
                direction={'row'}
                sx={{ backgroundColor: lyricImageColors[randomState] }}
                justifyContent='start'
                alignItems={'center'}
                height={'auto'}
                paddingY = {'4px'}
              >
                <Box
                  display={'block'}
                  width='inherit'
                  margin='2px auto'
                  paddingLeft='10px'
                  paddingRight='2px'
                  height='100%'
                >
                  <Typography
                    fontSize={{ xs: '1.5rem', sm: '2rem', md: '3rem' }}
                    variant='h1'
                    display={'inline'}
                  >
                    Holi
                  </Typography>
                  <Typography
                    variant='h1'
                    fontSize={{ xs: '1.5rem', sm: '2rem', md: '3rem' }}
                    display={'inline'}
                    color={lyricLogoColors[randomState] ?? red[400]}
                  >
                    fi
                  </Typography>
                </Box>
                {/* <Divider
                  orientation='vertical'
                  flexItem
                  style={{
                    width: '1px',
                    backgroundColor: '#fff',
                    border: 'none',
                  }}
                /> */}
                <Stack textAlign={'center'} width={'100%'} marginX={0.5}>
                  <Typography
                    variant={'h1'}
                    fontSize={{ xs: '0.7rem', sm: '1.5rem', md: '1.8rem' }}
                    display={'inline'}
                    sx={{ fontFamily: 'Comfortaa' }}
                    letterSpacing={{ xs: 0.2, sm: 2, md: 3 }}
                  >
                    {Protagonists[formData['character']]} presents
                  </Typography>
                  <Typography
                    variant={'h1'}
                    fontSize={{ xs: '0.5rem', sm: '1rem', md: '1.2rem' }}
                    letterSpacing={{ xs: '0.5px', sm: 2, md: 3 }}
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
            <Box
              height={{ sm: '80%', md: '100%' }}
              marginTop={{ xs: '20px', sm: '0px', md: '50px' }}
              marginBottom={{ xs: '15px', md: '30px' }}
              overflow='hidden'
              sx={{ backgroundColor: 'rgba(0,0,0,.5)' }}
            >
              <Stack height='100%'>
                <Typography
                  display='block'
                  fontSize={{ md: '1.5rem' }}
                  textAlign='center'
                  whiteSpace='pre-line'
                  overflow={'auto'}
                  dangerouslySetInnerHTML={sanitizedData(
                    songData.lyrics.substring(0, 1500)
                  )}
                ></Typography>
              </Stack>
            </Box>
            <Box
              sx={{ backgroundColor: lyricImageColors[randomState] }}
              textAlign='center'
              paddingX={{ sm: 5, md: 3 }}
              margin={'0 auto'}
              height={{ xs: '30%', sm: '10%', md: '20%' }}
              alignItems='center'
              display='flex'
            >
              <Typography
                variant={'h1'}
                fontSize={{ xs: '1rem', sm: '1.3rem', md: '1.8rem' }}
                letterSpacing={{ xs: 0.5, sm: 0.5, md: 1 }}
                display={'inline'}
              >
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
