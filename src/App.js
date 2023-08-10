import { Box } from '@mui/material';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import DataApp from './DataApp.jsx'
import DetailView from './components/details/DetailView';
import Cart from './components/cart/Cart'
import Shipping from './components/Shipping.jsx/Shipping';
import Summery from './components/order/Summery';
import Payment from './components/order/Payment';
// import Reciept from './components/order/Reciept';

function App() {
  return (
    <BrowserRouter>
    <DataApp >
      
       <Header/> 
       <Box style={{marginTop:54}}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/product/:id' element={<DetailView/>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shipping' element={<Shipping/>}/>
          <Route path='/summery' element={<Summery/>}/>
          <Route path='/payment' element={<Payment/>}/>
          {/* <Route path='/receipt' element={<Reciept/>}/> */}
        </Routes>
       </Box>  
    </DataApp>
    </BrowserRouter>
  );
}

export default App;
