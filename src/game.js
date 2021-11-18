import React, { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { useGlobalContext } from "./context";
import { Graph } from "./line-graph";

export const Game = () => {
    const {chosenStock, capital, currentPrice, sharesOwned, timer, setTimer, increaseDecreaseAlgorithm, toggleShares, tradeError, newGame, bestScore} = useGlobalContext();
    const countdown = useRef();

    useEffect(() => {
        countdown.current = setInterval(() => setTimer(newTime => newTime - 1), 1000);
    }, []);

    useEffect(() => {
        console.log(`the time is ${timer} seconds`);
        if (timer === 0) {
            clearInterval(countdown.current);
            console.log("finished");
            return;
        }
        increaseDecreaseAlgorithm();
    }, [timer])

    const match = bestScore.find(element => element.name === chosenStock);
    if (match) {

    }

    if (chosenStock === "") {
        return (
            <>
            <h2>You have arrived at this page in error. Cick here to go back:</h2>
            <Link to="/" className="btn">Return Home</Link>
            </>
        )
    }

    return (
        <>
        <h2>STOCK GAME</h2>
        <h4>Stock: {chosenStock}</h4>
        <h4>Capital: ${capital.toFixed(2)}</h4>
        <h4>Current Stock Price: ${currentPrice.toFixed(2)}</h4>
        <h4>Number of Shares: {sharesOwned}</h4>
        <h4>Total Stock Value: ${(parseInt(sharesOwned) * parseFloat(currentPrice)).toFixed(2)}</h4>
        <div className="stock-controls">
            <div className={`${timer === 0 ? "buy-stocks-div inactive":"buy-stocks-div"}`}>
                <button onClick={()=> toggleShares({type:"buy", amount:1})}>BUY</button>
            </div>
            <div className={`${timer === 0 ? "sell-stocks-div inactive":"sell-stocks-div"}`}>
                <button onClick={()=> toggleShares({type:"sell", amount:1})}>SELL</button>
            </div>
            {tradeError === "" ? "":<p className="trade-error">{tradeError}</p>}
        </div>
        <h4>Time Left: {timer} seconds</h4>
        <h4>Your {capital > 3000 ? "profit":"loss"} is: ${(capital - 3000).toFixed(2)}</h4>
        {match ? 
        <h4>High score for {chosenStock}: ${(match.profit).toFixed(2)} profit</h4>
        :
        ""}
        <Link to="/"><button className="start-btn" onClick={newGame}>NEW GAME</button></Link>
        <Graph />
        </>
    )
}