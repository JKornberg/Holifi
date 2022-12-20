import {Menu, MenuItem, MenuList, Divider, Stack, Typography, Box, Button, styled, ButtonProps} from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import PopupState from 'material-ui-popup-state';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useAuth } from '../../../contexts/AuthContext';
import Navlink from './Navlink';
import {
    usePopupState,
    bindTrigger,
    bindMenu,
  } from 'material-ui-popup-state/hooks'
import { NavBarButtonStyle } from '../../../styles/classes';

type Props = {
}


const NavBarButton = styled(Button)<ButtonProps>`
    ${NavBarButtonStyle}
`

const ProfileMenu = (props: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { loadingUser, logout } = useAuth();
    const router = useRouter();
    return (
        (loadingUser.user) ? (
          
            <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <NavBarButton variant="contained" {...bindTrigger(popupState)}>
                  Account
                </NavBarButton>

                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={()=>{router.push('/profile')}}>Profile</MenuItem>
                  {/* <MenuItem onClick={popupState.close}>My account</MenuItem> */}
                  <MenuItem onClick={()=>{logout(); popupState.close()}}>Logout</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        ) : (<Stack direction='row'><Navlink to='/login'>Login</Navlink><Navlink to='/register'>Register</Navlink></Stack>)
    )
}

export default ProfileMenu