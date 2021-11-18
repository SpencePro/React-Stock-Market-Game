import React from "react";
import { StockLookupForm } from "./forms";
import { Link } from 'react-router-dom';
import { useGlobalContext } from "./context";

export const Home = () => {
    const {chosenStock} = useGlobalContext();

    return (
        <>
        <header>
            <h2>Rules</h2>
            <h4>Let's go over the rules</h4>
            <ul>
                <li>Pick a stock based on its stock symbol (i.e., MCD, AMZN, AAPL, etc.)</li>
                <li>You have $3,000 to start with as your capital</li>
                <li>Every 2 seconds, the stock price will go up or down</li>
                <li>Once the timer starts, you have 60 seconds to buy and sell shares of stock using your capital to maximize your total</li>
                <li>Remember, the amount in your capital is unaffected by the market; only the stocks will change!</li>
                <li>Your goal is to maximize your capital; only the money in your capital counts - <b>unsold stocks are not counted in your total!</b></li>
            </ul>
            <h4>Got it? Scroll down to choose your stock</h4>
        </header>
        {/* scroll down to reveal form */}
        <div className="stock-form hidden">
            <StockLookupForm />
        </div>
        {/* start button will appear once user selects stock */}
        {chosenStock !== "" ? 
        <div className="stock">
            <h4>Press start to begin the game!</h4>
            <Link to="/game"><button className="start-btn">START</button></Link>
        </div>
        :
        ""}
        </>
    )
}