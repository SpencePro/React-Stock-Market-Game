import React from "react";
import { JSCharting } from 'jscharting-react';
import { useGlobalContext } from "./context";

export const Graph = () => {
    const {dailyPrices} = useGlobalContext();

    // const config = {
    //     type: "line", 
    //     series: 
    // }

    return (
        <div className="stock-graph-div">
            <div className="stock-graph">
                {dailyPrices.slice(1).map((eachDay) => {
                    const {day, price} = eachDay;
                    return (
                        <p key={day}>Day: {day} - Price: ${price.toFixed(2)}</p>
                    )
                })}
            </div>
        </div>
    )
}
