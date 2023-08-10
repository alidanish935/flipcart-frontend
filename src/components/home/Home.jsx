import { Box, styled } from '@mui/material'
import React,{useEffect} from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import MidSlide from './MidSlide'
import {useDispatch,useSelector} from 'react-redux'
import {getProducts} from '../redux/actions/productActions.js'
import MidSection from './MidSection'
import Slide from './Slide.jsx'
import CircularIndeterminate from '../../Spinner'

const Component = styled(Box)({
    padding: '10px',
    background: '#F2F2F2'
  })


const Home = () => {
  const {products} = useSelector(state => state.products)
  const products1 = useSelector(state => state.products)
  console.log('products-------',products,'loading--',products1)
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(getProducts())
  },[dispatch])
  
  return (
    <Box>
        {/* <CircularIndeterminate /> */}
        <Navbar/>
        <Component>
           <Banner/>
           <MidSlide products={products}   title='Discounts for You' timer={false}   />
           <MidSection />
           <Slide data={products} title="Best Discounts for You" timer={false}  />
           <Slide data={products} title="Season's Top Pick" timer={false} autoPlay={false}/>
        </Component>
    </Box>
  )
}

export default Home