import React from 'react'
import { Button, Link } from '@mui/material'
type Props = { to: string; children?: React.ReactNode }

const Navlink = (props: Props) => {
  return (
    <Button>
      <Link href={props.to}>{props.children}</Link>
    </Button>
  )
}

export default Navlink
