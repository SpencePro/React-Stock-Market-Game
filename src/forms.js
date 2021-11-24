import React, { useState, useEffect } from "react";
import { useGlobalContext } from "./context";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Loading } from "./loading";

export const StockLookupForm = () => {
    const {chosenStock, setChosenStock, currentPrice, setCurrentPrice, startGame, API_KEY} = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function lookupStocks() {
            setLoading(true);
            try {
                const response = await fetch(`https://eodhistoricaldata.com/api/eod/${chosenStock}.US?&period=d&fmt=json&order=d&api_token=${API_KEY}`);
                const data = await response.json();
                setCurrentPrice(data[0].close);
                setLoading(false);
            }
            catch (err) {
                setLoading(false);
                setError(true);
            }
        }
        if (chosenStock !== "") {
            lookupStocks();
        }
    }, [chosenStock])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
        <div className="stock-lookup">
            <div className="stock-search-div">
                <input type="text" id="stock-symbol" placeholder="Stock Symbol" />
                <button type="button" className="search-btn" onClick={()=>setChosenStock(document.getElementById("stock-symbol").value.toUpperCase())} ><FaSearch className="search-icon"/></button>
            </div>
        </div>
        {chosenStock !== "" && loading === false && error === false ? 
        <div className="stock-info">
            <h4>Chosen Stock: {chosenStock}</h4>
            <h4>Starting Capital: $3000</h4>
            <h4>Price per Share: ${currentPrice}</h4>
            <div className="game-start">
                {currentPrice > 3000 ? <p className="loss">This stock is too expensive! Pick another one</p>
                :
                <Link to="/game"><button className="btn start-btn" onClick={startGame}>START</button></Link>
                }
            </div>
        </div>
        :
        ""}
        {error ? 
        <h4>An error occurred. Please try again later</h4>
        :
        ""
        }
        </>
    );
}