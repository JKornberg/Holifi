import { Button, Card, colors, Divider, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import useWindowSize from '../common/hooks/useWindowSize'
//create landing page
const Landing = () => {
  const width = useWindowSize()
  const router = useRouter()

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'url(/snow_cabin.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
        <Typography variant='h2' display={'inline'}>
          Welcome to{' '}
        </Typography>
        <Typography
          variant='h1'
          display={'inline'}
          marginLeft={'20px'}
          color={green}
        >
          Holi
        </Typography>
        <Typography variant='h1' display={'inline'} color={red[400]}>
          fi
        </Typography>
      </Box>
      <Box>
        <Typography variant='h6' textAlign={'center'}>
          Turn your favorite song lyrics into a fun holiday parody!
        </Typography>
        <Divider
          light={true}
          variant={'fullWidth'}
          style={{
            margin: '20px auto 20px auto',
            width: '90%',
            backgroundColor: 'white',
            height: '2px',
            border: 'none',
          }}
        />
      </Box>
      <Button
        style={{ marginTop: '0' }}
        variant='contained'
        color='primary'
        onClick={() => router.push('/login')}
      >
        Join the Party
      </Button>
    </Card>
  )
}

export default Landing
