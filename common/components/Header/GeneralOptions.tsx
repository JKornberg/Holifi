import {
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material'
import { useState } from 'react'

export default function GeneralOptions(props: {
  dropDown: any
  width: any
  validHoliday: any
  validCharacter: any
  setValidCharacter: any
  setValidHoliday: any
  songForm: any
  sliderMargin: any
  buttonText: any
  setNaughtyLevel: any
}) {
  const {
    dropDown,
    width,
    validHoliday,
    validCharacter,
    setValidCharacter,
    setValidHoliday,
    songForm,
    sliderMargin,
    buttonText,
    setNaughtyLevel,
  } = props

  let [character, setCharacter] = useState<String>('')
  let [holiday, setHoliday] = useState<String>('')

  return (
    <Box margin='0 auto' marginTop={3} alignItems={'center'}>
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
              Select Holiday
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
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
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
              Select Character
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
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
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
          <Typography fontFamily={'Montserrat'}>{buttonText}</Typography>
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
  )
}
