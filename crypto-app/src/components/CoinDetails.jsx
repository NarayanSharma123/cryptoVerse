import React from 'react'
import { useState, useEffect } from 'react';
import { Baseurl } from './baseURL.js'
import Loader from './Loader.jsx'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CoinImage from "../coin.png"
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi"
import "./coinDetail.css"
import { IoPulseOutline } from "react-icons/io5"
import CoinChart from './CoinChart.jsx'

const CoinDetails = () => {
  const [coin, setCoin] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams();
  const [currency, setCurrency] = useState('inr');
  const currencySymbol = currency === 'inr' ? '₹' : '$'
  const profit = coin.market_data?.price_change_percentage_24h > 0 
  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/coins/${id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch(error) {
        console.log(error);
        setLoading(false);
      }
    }
    getCoin();
  }, [id])
  return (
    <>
    {
      loading ? <Loader /> : <>
      <div className='coinDetail' style={{display:"flex", justifyContent:"space-evenly"}}>
        <div className="coinInfo">
          <div className="btns">
            <button onClick={() => setCurrency('inr')}>INR</button>
            <button onClick={() => setCurrency('usd')}>USD</button>
          </div>

          <div className="time">{`Last Update ${coin.last_updated}`}</div>
          <div className="coinImage">
            <img height={"150px"} src={coin.image.large} alt={coin.name} />
          </div>
          <div className="coinName">{coin.name}</div>
          <div className="coinPrice">{ currencySymbol } {coin.market_data.current_price[currency]}</div>
          <div className="coinProfit">
            {profit ? <BiSolidUpArrow color='green' /> : <BiSolidDownArrow color='red' />}&nbsp;
            {coin.market_data.price_change_percentage_24h} %
            </div>
          <div className="market-rank">
            <IoPulseOutline color='orange' /> #{coin.market_cap_rank}</div>
          <div className="coinDes">
            <p>{coin.description.en.split('.')[0]}</p>
          </div>
        </div>
        <CoinChart currency={currency} />
      </div>
      </>
    }
    </>
  )
}

export default CoinDetails
