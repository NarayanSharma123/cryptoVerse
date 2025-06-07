import React, { useEffect, useState } from 'react'
import Header from './header.jsx'
import axios from 'axios'
import { Baseurl } from './baseURL.js'
import Loader from './Loader.jsx'
// import coin from "../coin.png"
import "./Exchanges.css";
import OutModel from './OutModels.jsx'

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([])
  useEffect(() => {
    const getExchangesData = async () => {
      const { data } = await axios.get(`${Baseurl}/exchanges`);
      console.log(data);
      setExchanges(data);
      setLoading(false);
    }
    getExchangesData();
  }, [])
  return (
    <>
      {
        loading ? <Loader /> : <>
        <Header />
        <OutModel />
        <div>
          {
            exchanges.map((item, idx) => {
              return (
              <div key={idx} className="ex-cards">
                <div className="image">
                  <img height={"80px"} src={item.image} alt={item.name} />
                </div>
                <div className="name">{item.name}</div>
                <div className="price">{item.trade_volume_24h_btc.toFixed(0)}</div>
                <div className="rank">{item.trust_score_rank}</div>
              </div>
              )
            })
          }
        </div>
        </>
      }
    </>
  )
}

export default Exchanges
