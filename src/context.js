import React, { useState, useContext, useEffect } from 'react';

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
    const [dailyPrices, setDailyPrices] = useState([]);
    const [sharesOwned, setSharesOwned] = useState(0);
    const numberOfDays = 60;
    const [timer, setTimer] = useState(numberOfDays);
    const [tradeError, setTradeError] = useState("");
    const plusOrMinus = ["plus", "plus", "minus"];
    const [bestScore, setBestScore] = useState(getLocalStorageScore()); 
    const API_KEY = "OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX"; // default API key for MCD, free to use, no limits, use for testing

    console.log(bestScore);
    
    const newGame = () => {
        setCapital(3000);
        setChosenStock("");
        setCurrentPrice(0);
        setDailyPrices([]);
        setSharesOwned(0);
        setTimer(numberOfDays);
        setTradeError("");
        console.log("activated");
        return;
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
            }
            else {
                const match = bestScore.find(element => element.name === chosenStock);
                if (match) {
                    console.log(match);
                    if (currentProfit > parseFloat(match.profit)) {
                        const newBestScore = {
                            name: chosenStock,
                            totalValue: capital,
                            profit: currentProfit,
                        };
                        console.log(newBestScore);
                        const index = bestScore.indexOf(match);
                        bestScore.splice(index, 1, newBestScore);
                        setBestScore([...bestScore]);
                    }
                }
                else {
                    const newBestScore = {
                        name: chosenStock,
                        totalValue: capital,
                        profit: currentProfit,
                    };
                    setBestScore([...bestScore, newBestScore]);
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

    const increaseDecreaseAlgorithm = () => {
        const randInt = Math.floor(Math.random() * 3);
        const direction = plusOrMinus[randInt];

        if (direction === "plus") {
            const newPrice = currentPrice * 1.02;
            setCurrentPrice(newPrice);
            const newDay = {
                day: numberOfDays - timer + 1,
                price: newPrice
            };
            setDailyPrices([...dailyPrices, newDay]);
        }
        else {
            const newPrice = currentPrice * 0.98
            setCurrentPrice(newPrice);
            const newDay = {
                day: numberOfDays - timer + 1,
                price: newPrice
            };
            setDailyPrices([...dailyPrices, newDay]);
        }
    }
    
    const toggleShares = (action) => {
        const {type, amount} = action;
        console.log(type);
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


    return (
        <AppContext.Provider value={{ capital, setCapital, chosenStock, setChosenStock, newGame, currentPrice, setCurrentPrice, dailyPrices, setDailyPrices, sharesOwned, setSharesOwned, timer, setTimer, increaseDecreaseAlgorithm, toggleShares, tradeError, bestScore, API_KEY }}>
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }