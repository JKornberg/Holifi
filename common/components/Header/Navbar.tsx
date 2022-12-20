import { FC, useState } from "react";
import {Stack, Link, IconButton, Typography, Unstable_Grid2} from "@mui/material";
import { BsPersonCircle } from 'react-icons/bs';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { getAuth } from "firebase/auth";
import ProfileMenu from "./ProfileMenu";

interface Props {
  children?: React.ReactNode;
}

const NavBar = (props: any) => {
  return (
    <>
      <NavBarContainer {...props} p='10px'>
        <Stack direction='row'>
          <Link href='/'><IconButton  children={<AiOutlineHome />} /></Link>
          

        </Stack>

        <Typography color='white' fontSize={'4xl'}></Typography>
        <ProfileMenu />
      </NavBarContainer>
    </>
  );
};

const NavBarContainer: FC<Props> = ({ children, ...props }) => {
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center' {...props}>
    
      {children}
    </Stack>
  );
};

export default NavBar;