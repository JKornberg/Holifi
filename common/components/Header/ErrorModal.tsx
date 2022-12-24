import { Box, Divider, IconButton, Modal, Typography } from '@mui/material'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import * as React from 'react'

export default function ErrorModal(props: {
  fetchError: any
  setFetchError: any
}) {
  const { fetchError, setFetchError } = props
  return (
    <Modal
      open={fetchError}
      onClose={() => setFetchError(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        style={{
          backgroundColor: '#090c24',
          padding: 20,
          borderRadius: 10,
          position: 'relative',
        }}
        width={{ xs: '70%', sm: '45%', md: '30%' }}
      >
        <IconButton
          style={{ position: 'absolute', top: 0, right: 0 }}
          children={<AiOutlineCloseCircle />}
          onClick={() => setFetchError(false)}
        />
        <Typography
          id='modal-modal-title'
          variant='h6'
          textAlign={'center'}
          fontFamily='Montserrat'
          color='#ef5350'
        >
          Error generating lyrics
        </Typography>
        <Divider
          light={true}
          variant={'fullWidth'}
          style={{
            margin: '10px auto',
            width: '100%',
            backgroundColor: 'lightgrey',
            height: '0.5px',
            border: 'none',
          }}
        />
        <Typography
          id='modal-modal-title'
          textAlign={'center'}
          fontFamily='Montserrat'
          color='lightgrey'
        >
          Please try again in a moment
        </Typography>
      </Box>
    </Modal>
  )
}
