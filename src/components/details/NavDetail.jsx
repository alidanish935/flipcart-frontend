import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { Box, Card, Grid, Typography, styled } from '@mui/material';

import CircularIndeterminate from '../../Spinner';
import { getProducts, getProductsCloth } from '../redux/actions/productActions';


const Component = styled(Box)`
display: flex;
flex-wrap: wrap;
margin:5%;
       
  
`;

const Container = styled(Grid)(({ theme }) => ({
  background: '#FFFFFF',
  // display: 'flex',
  [theme.breakpoints.down('md')]: {
    margin: 0
  }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
    margin-left: 20px;
    & > p {
        margin-top: 10px;
    }
`;

// const Image = styled('img')({
//   padding: '15px 20px',
//   border: '1px solid #f0f0f0',
//   width: '95%'
// });
const ImageContainer = styled(Box)`
margin: auto;
width: 80%;
padding: 20px;

`
const Image = styled('img')({
 
  width: '18vh',
  height: 150,
  
})

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 5px
`

const NavDetail = () => {
  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

  const [data, setData] = useState()
  
  const { id } = useParams()
  console.log('id in navdetails - ', id, typeof (id))
  const { products } = useSelector(state => state.products)
  const { clothProduct } = useSelector(state => state.clothProduct)

  console.log('products in NavDetail-------',products,'clothProduct--in NavDetail',clothProduct)
  const combineProduct = [...products,...clothProduct]
  console.log('nav combine product-------',combineProduct)


  useEffect(() => {
    if(id === "general"){
      const res = combineProduct.filter((item) => {
        return item.filter ===  id || item.filter === "laptop"
      })
      setData(res)
    }else{
      const res = combineProduct.filter((item) => {
        return item.filter ===  id
      })
      setData(res)
    }
    
 
  }, [products,clothProduct])
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(getProductsCloth())
  //  dispatch(getProducts())
  },[dispatch,id,products])
  

  return (
    <Component>
     {
                   data && [...new Set(data.map(temp => (
                    <Box style={{marginRight:'2%'}}>


                        <Link to={`product/${temp.id}`} style={{textDecoration: 'none'}}>
                            <Box style={{ padding: '25px 15px' }}>
                                <Image src={temp.url}  />
                                <Text style={{ fontWeight: 600, color: '#212121',fontSize:18 }}>{temp.title.shortTitle}</Text>
                                <Text style={{ color: 'green' }}>₹{temp.price.cost}</Text>
                                <Text style={{ color: '#212121', opacity: '.6' }}>{temp.tagline}</Text>
                               
                            </Box>
                         </Link>
                     </Box>
                    )))]
                }
    </Component>
  )
}

export default NavDetail
{/*  <RightContainer item lg={7} md={8} sm={8} xs={12}>
      <Typography>{data.title.longTitle}</Typography>
      <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}>
          8 Ratings & 1 Reviews
          <span><img src={fassured} style={{ width: 77, marginLeft: 20 }} /></span>
      </Typography>
      <Typography>
          <span style={{ fontSize: 28 }}>₹{data.price.cost}</span>&nbsp;&nbsp;&nbsp;
          <span style={{ color: '#878787' }}><strike>₹{data.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
          <span style={{ color: '#388E3C' }}>{data.price.discount} off</span>
      </Typography>
      <ProductDetail data={data}  />
  </RightContainer> */}