import React, { useState, useEffect } from "react";
// import { API_KEY } from "./config";
import { useGlobalContext } from "./context";
import { FaSearch } from "react-icons/fa";

export const StockLookupForm = () => {
    const {chosenStock, setChosenStock, currentPrice, setDailyPrices, setCurrentPrice, API_KEY} = useGlobalContext();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function lookupStocks() {
            setLoading(true);
            try {
                const response = await fetch(`https://eodhistoricaldata.com/api/eod/${chosenStock}.US?&period=d&fmt=json&order=d&api_token=${API_KEY}`)
                const data = await response.json();
                setCurrentPrice(data[0].close);
                const dailyShare = {
                    date: data[0].date,
                    price: data[0].close
                }
                setDailyPrices([dailyShare]);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setLoading(false);
                return (
                    <h4>An error occurred. Please try a different stock</h4>
                )
            }
        }
        if (chosenStock !== "") {
            lookupStocks();
        }
    }, [chosenStock])

    if (loading) {
        return (
            <h4>Loading...</h4>
        )
    }

    return (
        <>
        <form className="stock-lookup">
            <div className="stock-search-div">
                <input type="text" id="stock-symbol" placeholder="Stock Symbol" />
                <button type="button" className="search-btn" onClick={()=>setChosenStock(document.getElementById("stock-symbol").value.toUpperCase())} ><FaSearch className="search-icon"/></button>
            </div>
        </form>
        {chosenStock !== "" ? 
        <div className="stock-info">
            <h4>Chosen Stock: {chosenStock}</h4>
            <h4>Starting Capital: $3000</h4>
            <h4>Price per Share: ${currentPrice}</h4>
        </div>
        :
        ""}
        </>
    );
}