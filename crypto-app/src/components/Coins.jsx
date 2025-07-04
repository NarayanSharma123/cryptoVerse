import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import { Baseurl } from './baseURL.js';
import Loader from './Loader.jsx';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./Coin.css"
import "./res.css"

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('inr');
  const [set, setSearch] = useState("");
  const currencySymbol = currency === 'inr' ? '₹' : '$';

  useEffect(() => {
    const getCoinData = async () => {
      const { data } = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`);
      console.log(data);
      setCoins(data);
      setLoading(false);
    };
    getCoinData();
  }, [currency]);  // currency change पर भी reload हो

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <Header />
          <div className="searchbar">
            <input
              className='searchCoin'
              type='text'
              placeholder='Search your coins'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="btns">
            <button onClick={() => setCurrency('inr')}>INR</button>
            <button onClick={() => setCurrency('usd')}>USD</button>
          </div>

          {/* केवल एक बार filter + map */}
          {coins
            .filter((data) =>
              set === "" || data.name.toLowerCase().includes(set.toLowerCase())
            )
            .map((coinData, idx) => (
              <CoinCard
                key={coinData.id}
                coinData={coinData}
                idx={idx}
                id={coinData.id}
                currencySymbol={currencySymbol}
              />
            ))}
        </>
      )}
    </>
  );
};

const CoinCard = ({ coinData, idx, id, currencySymbol }) => {
  const profit = coinData.price_change_percentage_24h > 0;
  return (
    <Link to={`/coins/${id}`} style={{ color: "white", textDecoration: "none" }}>
      <div className="ex-cards">
        <div className="image">
          <img height="80px" src={coinData.image} alt={coinData.name} />
        </div>
        <div className="name">{coinData.name}</div>
        <div className="price">{currencySymbol}{coinData.current_price.toFixed(0)}</div>
        <div className="rank" style={profit ? { color: "green" } : { color: "red" }}>
          {profit ? "+" + coinData.price_change_percentage_24h.toFixed(2) : coinData.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default Coins;
