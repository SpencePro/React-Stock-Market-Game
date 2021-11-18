import React, { useState, useEffect } from "react";
// import { API_KEY } from "./config";
import { useGlobalContext } from "./context";

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
            <input type="text" id="stock-symbol" />
            <button type="button" onClick={()=>setChosenStock(document.getElementById("stock-symbol").value.toUpperCase())} >Search</button>
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
        
    // fetch(`https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v6/finance/quote?symbols=${stockSymbol}`, {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-key": API_KEY,
    //         "x-rapidapi-host": "stock-data-yahoo-finance-alternative.p.rapidapi.com"
    //     }
    //     })
    //     .then(function(response) {
    //         return response.json();
    //     }).then(function(data) {
    //         console.log(data);
    //     }).catch(err => {
    //         console.error(err);
    //     });
        // console.log(API_KEY);
        // console.log(stockSymbol)
}