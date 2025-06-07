import React from 'react'
import { useState, useEffect } from 'react';
import { Baseurl } from './baseURL'
import axios from 'axios';
import Loader from './Loader'
import { useParams } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

const CoinChart = ({currency}) => {
    const [chartData, setChartData] = useState([])
    const { id } = useParams();
    const [days, setDays] = useState(1)
    const CoinChartData = async () => {
        try {
            const { data } = await axios.get(`${Baseurl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
            setChartData(data.prices);
            console.log(data.prices);
        } catch(error) {
            console.log(error);
        }
    }
    useEffect(() => {
        CoinChartData();
    },[currency, id, days])

    const myData = {
        labels: chartData.map((value) => {
            const date = new Date(value[0]);
            const time = date.getHours() > 12 ? `${date.getHours() -12} : ${date.getMinutes()} PM` : `${date.getHours()} : ${date.getMinutes()} AM`;
            return days === 1 ? time: date.toLocaleDateString()
        }),
        datasets: [
            {
                label: ` Price in Past Days ${days} in ${currency} `,
                data: chartData.map((value) => value[1]),
                borderColor: "orange",
                borderWidth: "3"
            }
        ]
    }

  return (
    <>
    {
        chartData.length === 0 ? (<Loader />) : (
            <div>
                <Line data={myData} options={{
                    elements:{
                        point:{
                        radius:1,
                    }
                }
                }} style={{marginTop:"5rem", width:"50rem"}} />

                <div className="btns" style={{marginTop:"30px"}}>
                    <button onClick={() => setDays(1)}>24 HOUR</button>
                    <button onClick={() => setDays(30)}>1 MONTH</button>
                    <button onClick={() => setDays(365)}>1 YEAR</button>
                </div>
            </div>
        )
    }
    </>
  )
}

export default CoinChart
