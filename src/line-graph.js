import React from "react";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "./context";

export const Graph = () => {
    const {dailyPrices, days, darkMode} = useGlobalContext();

    const data = {
        labels: [...days],
        datasets: [
            {
                label: 'Stock Prices Over Time ($)',
                data: [...dailyPrices],
                fill: false,
                backgroundColor: darkMode ? 'rgb(131, 209, 247)' : 'rgb(0, 170, 255)',
                borderColor: darkMode ? 'rgb(0, 170, 255)' : 'rgb(0, 170, 255, 0.5)',
            },
        ],
    };

    const options = {
        animation: {
            duration: 0
        }
    }
    return (
        <div className="chart-div">
            <Line data={data} options={options} />
            <p>Days</p>
        </div>
    )
}
