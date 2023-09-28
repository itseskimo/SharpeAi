import { AreaChart, Area, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from 'react'

import './Chart.css'
const Chart = () => {

    const [chartData, setChartData] = useState([])
    const [chartTimeController, setChartTimeController] = useState(30)
    const [arrayLength, setArrayLength] = useState(0)


    async function fetchData() {
        const response = await fetch('https://api.llama.fi/summary/fees/lyra?dataType=dailyFees')
        const res = await response.json()
        setChartData(convertToObjects(res.totalDataChart)); //Function to convert into array of objects
        setArrayLength(res.totalDataChart)
    }

    useEffect(() => {
        fetchData()
    }, [chartTimeController])


    function convertToObjects(array) {
        const arrayOfObjects = [];

        for (const [timestamp, amount] of array) {
            const obj = {
                date: formatTimestamp(timestamp),
                amount,
            };
            if (arrayOfObjects.length > chartTimeController) break
            arrayOfObjects.push(obj);
        }

        return arrayOfObjects;
    }


    function formatTimestamp(timestamp) {
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        const options = {
            month: 'short', // Use the abbreviated month format
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true, // Use 12-hour time format (AM/PM)
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        let formattedDate = formatter.format(date);

        // Remove AM or PM from the formatted date
        formattedDate = formattedDate.replace(/\s[APap][Mm]$/, '');

        // Remove the comma after the day
        formattedDate = formattedDate.replace(',', '');

        return formattedDate;
    }



    function handleCount(operation) {
        if (chartTimeController <= 30 && operation === 'decrement') return
        if (chartTimeController >= arrayLength.length - 1 && operation === 'increment') return
        if (operation === 'increment') setChartTimeController((prev) => prev + 30)
        else setChartTimeController((prev) => prev - 30)
    }





    return (
        <div className='chart_container'>
            <div className='date_dispay_container'>
                <span onClick={() => handleCount('decrement')}>-</span>
                <h6>Chart of {chartTimeController === 480 ? `${chartTimeController}+` : chartTimeController} Days</h6>
                <span onClick={() => handleCount('increment')}>+</span>
            </div>

            <ResponsiveContainer width="50%" height={300} >
                <AreaChart data={chartData} width={500}>

                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop stopColor="#95b0ff" stopOpacity={1} />

                        </linearGradient>
                    </defs>

                    <Area type="dashed" strokeLinejoin="round" dataKey="amount" stroke="#6483d2" strokeWidth={1.3} fill="url(#color)" />
                    <XAxis dataKey='date' axisLine={false} tickLine={false} />
                    <Tooltip itemStyle={{ color: "black", backgroundColor: "white" }} contentStyle={{ color: "black", backgroundColor: "white" }} />

                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart