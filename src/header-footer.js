import React from "react";
import { Link } from 'react-router-dom';
import { useGlobalContext } from "./context";
import { BsInfoCircle } from "react-icons/bs";

export const Header = () => {
    const {newGame} = useGlobalContext();

    return (
        <>
        <div className="header">
            <h1><Link to="/" onClick={newGame}>Stock Game</Link></h1>
        </div>
        </>
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