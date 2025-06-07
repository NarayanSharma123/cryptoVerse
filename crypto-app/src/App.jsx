import './App.css';
import { Routes, Route } from "react-router-dom";
// import Header from './components/header';
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails';
// import OutModels from './components/OutModels';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Exchanges />} />
      <Route path='/coins' element={<Coins />} />
      <Route path='/coins/:id' element={<CoinDetails />} />
      {/* <Route path='/outModels' element={<OutModels />} /> */}
    </Routes>
  )
}

export default App;
