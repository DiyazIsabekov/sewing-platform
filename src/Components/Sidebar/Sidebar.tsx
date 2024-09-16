import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import logo from '../../assets/img/Logo.svg'

import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import IronOutlinedIcon from '@mui/icons-material/IronOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import NavLinkItem from '../NavlinkItem/NavLinkItem';
import s from './Sidebar.module.scss'


const drawerWidth = 120;

export default function Sidebar() {
    return (

        <>
            <Drawer

                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 1,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#D8E7FC',
                        cursor: "auto"
                    },
                }}
            >
                <Toolbar className={s.logo}>
                    <img src={logo} alt="logo" />
                </Toolbar>

                <Box sx={{ overflow: 'auto' }}>
                    <List >
                        <NavLinkItem img={<TrendingUpOutlinedIcon />} link='/trending' />
                        <NavLinkItem img={<AccountBalanceWalletRoundedIcon />} link='/balance' />
                        <NavLinkItem img={<IronOutlinedIcon />} link='/clothes' />
                        <NavLinkItem img={<PersonAddAltOutlinedIcon />} link='/new-employee' />
                    </List>
                </Box>
            </Drawer>




        </>


    );
}


