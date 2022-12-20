import { Box, Card, CardHeader, CardMedia, Typography, TypographyProps } from "@mui/material"
import Link from "next/link";
import { ItemType } from "../../types/firebase_types"
function getDateString (seconds: number) {
  const x = new Date(Date.UTC(1970,0,1));
  x.setSeconds(seconds);
  return x.toLocaleDateString();
}

interface GalleryItemProps {
  item: ItemType
}


function GalleryItem(props: GalleryItemProps) {
  const subheaderProps : TypographyProps = {
    variant: "h6",
    color: "textPrimary",
    sx: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0.0075em",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      textAlign: "center"
    }
  }

  const titleProps : TypographyProps = {
    variant: "subtitle2",
    color: "textSecondary",
    sx: {
      fontSize: "1.4rem",
      fontWeight: 600,
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      textAlign: "center"
    }
  }



    return <Box component="div" textAlign='center'>
      <Card sx={{ padding: 5, paddingTop: 0, backgroundColor: 'fff'}} variant='outlined'>
      <CardHeader subheader={<a href={props.item.tweetUrl} target={'_blank'}>{props.item.tweetText}</a>} title={getDateString(props.item.date._seconds)} 
      titleTypographyProps={titleProps} subheaderTypographyProps={subheaderProps}
      />
        {/* <img src={props.item.contentUrl} width='100%' /> */}
        <CardMedia component='video' image={'https://i.imgur.com/CVaKviy.mp4/'} autoPlay loop muted />
      </Card>
  
    </Box>
  }
  
  export default GalleryItem;