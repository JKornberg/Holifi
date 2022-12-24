import { Button, CircularProgress, Typography } from '@mui/material'

export default function GenerateButton(props: {
  isSubmitting: any
  setValidArtist: any
  setValidHoliday: any
  setValidSong: any
  setValidCharacter: any
  songForm: any
  validate: any
  buttonColor: any
}) {
  const {
    isSubmitting,
    setValidArtist,
    setValidHoliday,
    setValidSong,
    setValidCharacter,
    songForm,
    validate,
    buttonColor,
  } = props
  return (
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
                songForm.setFieldValue('holiday', songForm.values.holiday - 1)
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
  )
}
