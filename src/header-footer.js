import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineStock } from "react-icons/ai";

export const Header = () => {

    return (
        <>
        <div className="header">
            <h1 className="header-icon"><AiOutlineStock/></h1>
            <h1>Stock Game</h1>
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