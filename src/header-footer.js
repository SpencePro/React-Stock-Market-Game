import React from "react";

// Styles
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Tooltip, IconButton, Grid } from "@mui/material";

// Context
import { useGlobalContext } from "./context";

export const Header = () => {
    const { darkMode, setDarkMode } = useGlobalContext();

    return (
        <Grid container justifyContent='space-between' alignItems='center' className="header">
            <Grid>
                { null }
            </Grid>
            <Grid container flexWrap='nowrap' width='fit-content'>
                <h1 className="header-icon"><AiOutlineStock/></h1>
                <h1>Stock Game</h1>
            </Grid>
            <Grid>
                <Tooltip
                    title={
                        darkMode ? 'Set to light mode' : 'Set to dark mode'
                    }
                >
                    <IconButton
                        onClick={ () => setDarkMode( !darkMode ) }
                    >
                        {
                            darkMode
                                ? (
                                    <LightModeIcon fontSize="large" className='mode-icon'/>
                                )
                                : (
                                    <DarkModeIcon fontSize="large" className='mode-icon'/>
                                )
                        }
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export const Footer = () => {
    return (
        <>
        <footer className="footer">
            <BsInfoCircle /> 
            <p className="disclaimer">This game is for entertainment purposes only. It is not intended as an accurate projection of stock prices, and you should not base your investments on results of this game.</p>
        </footer>
        </>
    )
}