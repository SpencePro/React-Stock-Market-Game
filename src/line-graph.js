import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "./context";

export const Graph = () => {
    const {dailyPrices, days} = useGlobalContext();

    const data = {
        labels: [...days],
        datasets: [
            {
                label: 'Stock Prices Over Time ($)',
                data: [...dailyPrices],
                fill: false,
                backgroundColor: 'rgb(0, 170, 255)',
                borderColor: 'rgb(0, 170, 255, 0.5)',
            },
        ],
    };

    const options = {
        animation: {
            duration: 0
        },
        scales: {
            yAxes: [{
                title: {
                    display: true,
                    text: "Price ($)"
                }
            }],
            xAxes: [{
                title: {
                    display: true,
                    text: "Days"
                }
            }]
        }
    }

    // const [dataPoints, setDataPoints] = useState([]);

    // useEffect(() => {
    //     const updateDataPoints = () => {
    //         dailyPrices.slice(1).map((eachDay) => {
    //             const {day, price} = eachDay;
    //             const point = {x: day, y: `$${price.toFixed(2)}`};
    //             setDataPoints([...dataPoints, point]);
    //     })}
    //     updateDataPoints();
    // }, [dailyPrices]);

    // // updateDataPoints();
    
    // const config = {
    //     type: "line", 
    //     series: [
    //         {
    //             points: [dataPoints]
    //         }
    //     ]
    // }
    
    // const divStyle = {
    //     maxWidth: '700px',
    //     height: '400px',
    //     margin: '0px auto'
    // };

    // // const addData = () => {
    // //     config.series(0).points.add()
    // // }
    
    return (
        // <div style={divStyle}><JSCharting options={config} /></div>
        <div className="chart-div">
            <Line data={data} options={options} />
        </div>

        // <div className="stock-graph-div">
        //     <div className="stock-graph">
        //         {dailyPrices.slice(1).map((eachDay) => {
        //             const {day, price} = eachDay;
        //             return (
        //                 <p key={day}>Day: {day} - Price: ${price.toFixed(2)}</p>
        //             )
        //         })}
        //     </div>
        // </div>
    )
}
