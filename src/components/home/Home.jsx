import { Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import MidSlide from './MidSlide'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getProductsCloth } from '../redux/actions/productActions.js'
import MidSection from './MidSection'
import Slide from './Slide.jsx'
import CircularIndeterminate from '../../Spinner'

import { Bars } from  'react-loader-spinner'


const Component = styled(Box)({
  padding: '10px',
  background: '#F2F2F2'
})


const Home = () => {
  const { products, loading } = useSelector(state => state.products)
  const { clothProduct } = useSelector(state => state.clothProduct)
  // const products1 = useSelector(state => state.products)
  console.log('products-------', products, 'loading--', clothProduct)
  const generalData = products && products.filter((item) => item.filter === 'general')
  const seasonData = products && products.filter((item) => {
    return item.filter === 'phone' || item.filter === 'laptop' || item.filter === 'watch'
  })
  console.log('session data - ', seasonData)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getProductsCloth())
  }, [dispatch])

  return (
    <Box>
      {
        loading ? <>
            <div style={{ display: 'flex', justifyContent: "center",paddingTop:'50px' }}>Loading please wait.....</div>
          <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '80vh' }}>
            <Bars
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </>
          : <>
            <Navbar />
            <Component>
              <Banner />
              <MidSlide generalData={generalData} title='Discounts for You' timer={false} />
              <MidSection />
              <Slide data={clothProduct} title="Season's Top Pick" timer={false} />
              <Slide data={seasonData} title="Best Discounts for You " timer={false} autoPlay={false} />
            </Component>
          </>
      }
    </Box>
  )
}


export default Home