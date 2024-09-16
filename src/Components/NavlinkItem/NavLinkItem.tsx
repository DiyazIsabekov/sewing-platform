import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import s from './NavLinkItem.module.scss'

type PNavlinkItem = {
    link: string,
    img: ReactNode
}

const NavLinkItem: FC<PNavlinkItem> = ({ img, link }) => {
    return (
        <NavLink to={link} className={({ isActive }) => `${s.item} ${isActive ? s.item_active : ''}`}>
            <ListItem className={s.list}>
                <ListItemIcon>{img}</ListItemIcon>
            </ListItem>
        </NavLink >
    );
};

export default NavLinkItem;