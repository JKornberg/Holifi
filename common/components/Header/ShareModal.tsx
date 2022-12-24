import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Typography,
} from '@mui/material'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'

export default function ShareModal(props: {
  shareModal: any
  setShareModal: any
  shareImage: any
}) {
  const { shareModal, setShareModal, shareImage } = props
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
        width={{ xs: '90%', sm: '50%', md: '30%' }}
        style={{
          backgroundColor: '#090c24',
          padding: 20,
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
        ></Box>
        <Button
          style={{
            display: 'block',
            margin: '20px auto',
          }}
        >
          <FiShare />
        </Button>
      </Box>
    </Modal>
  )
}
