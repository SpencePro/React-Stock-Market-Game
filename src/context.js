import React, { useState, useContext, useEffect, useRef } from 'react';
import { API_KEY } from './config';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const getLocalStorageScore = () => {
        const bestScoreObject = localStorage.getItem("bestScore");
        if (bestScoreObject) {
            return JSON.parse(bestScoreObject);
        }
        else {
            return [];
        }
    }

    const [capital, setCapital] = useState(3000);
    const [chosenStock, setChosenStock] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    let [dailyPrices, setDailyPrices] = useState([]);
    let [days, setDays] = useState([]);
    const [sharesOwned, setSharesOwned] = useState(0);
    const numberOfDays = 60;
    const gameStart = useRef(false);
    const [timer, setTimer] = useState(numberOfDays);
    const [tradeError, setTradeError] = useState("");
    const plusOrMinus = ["plus", "plus", "minus"];
    const [bestScore, setBestScore] = useState(getLocalStorageScore()); 
    const [newHighScore, setNewHighScore] = useState(false);
    // API key for testing:
    // const API_KEY = "OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX";
    
    const newGame = () => {
        setCapital(3000);
        setChosenStock("");
        setCurrentPrice(0);
        setDailyPrices([]);
        setDays([]);
        setSharesOwned(0);
        setTimer(numberOfDays);
        setTradeError("");
        gameStart.current = false;
        setNewHighScore(false);
        return;
    }

    const startGame = () => {
        setDailyPrices([...dailyPrices, currentPrice]);
        setDays([...days, 1]);
        gameStart.current = true;
    }

    const increaseDecreaseAlgorithm = () => {
        const randInt = Math.floor(Math.random() * 3);
        const direction = plusOrMinus[randInt];
        if (direction === "plus") {
            const newPrice = currentPrice * 1.02;
            setCurrentPrice(newPrice);
        }
        else {
            const newPrice = currentPrice * 0.98
            setCurrentPrice(newPrice);
        }
    }

    useEffect(() => {
        function changePrices() {
            const newDay = currentPrice;
            setDailyPrices([...dailyPrices, newDay]);
            setDays([...days, numberOfDays - timer + 1]);
        }
        if (gameStart.current === true) {
            changePrices();
        }
    }, [currentPrice])

    const toggleShares = (action) => {
        const {type, amount} = action;
        if (type === "buy") {
            if (amount * currentPrice <= capital) {
                const newShares = sharesOwned + amount;
                setSharesOwned(newShares);
                const newCapital = capital - (amount * currentPrice);
                setCapital(newCapital);
                setTradeError("");
            }
            else {
                setTradeError("You do not have enough money to buy these shares");
            }
        }
        else {
            if (amount <= sharesOwned) {
                const newShares = sharesOwned - amount;
                setSharesOwned(newShares);
                const newCapital = capital + (amount * currentPrice);
                setCapital(newCapital);
                setTradeError("");
            }
            else {
                setTradeError("You do not have enough shares to sell");
            }
        }
    }

    useEffect(() => {
        const checkHighScore = () => {
            const currentProfit = capital - 3000;
            if (bestScore.length === 0) {
                const newBestScore = {
                    name: chosenStock,
                    totalValue: capital,
                    profit: currentProfit,
                };
                setBestScore([newBestScore]);
                setNewHighScore(true);
            }
            else {
                const match = bestScore.find(element => element.name === chosenStock);
                if (match) {
                    if (currentProfit > parseFloat(match.profit)) {
                        const newBestScore = {
                            name: chosenStock,
                            totalValue: capital,
                            profit: currentProfit,
                        };
                        const index = bestScore.indexOf(match);
                        bestScore.splice(index, 1, newBestScore);
                        setBestScore([...bestScore]);
                        setNewHighScore(true);
                    }
                }
                else {
                    const newBestScore = {
                        name: chosenStock,
                        totalValue: capital,
                        profit: currentProfit,
                    };
                    setBestScore([...bestScore, newBestScore]);
                    setNewHighScore(true);
                }
            }
        };
        if (timer === 0) {
            checkHighScore();
        }
    }, [timer]);

    useEffect(() => {
        localStorage.setItem("bestScore", JSON.stringify(bestScore));
    }, [bestScore]);


    return (
        <AppContext.Provider value={{ capital, setCapital, chosenStock, setChosenStock, newGame, currentPrice, setCurrentPrice, dailyPrices, setDailyPrices, sharesOwned, setSharesOwned, timer, setTimer, increaseDecreaseAlgorithm, toggleShares, tradeError, bestScore, days, setDays, gameStart, startGame, newHighScore, API_KEY }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }