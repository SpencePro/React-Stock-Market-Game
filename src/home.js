import React from "react";
import { StockLookupForm } from "./forms";
import { useGlobalContext } from "./context";

export const Home = () => {
    const { darkMode } = useGlobalContext();

    return (
        <div className={ darkMode ? 'dark-home-div' : 'home-div'}>
            <h3>Pick a stock and maximize your profit</h3>
            <h5>Please note: this game is for entertainment purposes only. It is not intended as an accurate projection of stock prices, and you should not base your investments on results of this game.</h5>
            <h2>RULES</h2>
            <div>
                <ul>
                    <li>Pick a stock based on its stock symbol (i.e., MCD, AMZN, AAPL, etc.)</li>
                    <li>Every second, the stock price will go up or down</li>
                    <li>You have $3,000 to start with as your capital</li>
                    <li>Once the timer starts, you have 60 seconds to buy and sell shares of stock using your capital to maximize your total</li>
                    <li>Remember, the amount in your capital is unaffected by the market; only the stocks will change!</li>
                    <li>Your goal is to maximize your capital; only the money in your capital counts - <b>unsold stocks are not counted in your total!</b></li>
                    <li className="mobile-device-message">If you are using a mobile device, turn it <b>horizontally</b> for the best experience</li>
                </ul>
            </div>
            <h4>Got it? Search for your stock below</h4>
            <div>
                <StockLookupForm />
            </div>
        </div>
    )
}