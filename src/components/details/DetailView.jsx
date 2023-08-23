import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getClothDetails, getProductDetails } from '../redux/actions/productActions';
import { Box, Grid, Typography, styled } from '@mui/material';
import ActionItem from './ActionItem';
import ProductDetail from './ProductDetail';
import CircularIndeterminate from '../../Spinner';
import { Bars } from 'react-loader-spinner';
import { FormatPrice } from '../../utils/priceFormat';


const Component = styled(Box)`
    margin-top: 55px;
    background: #F2F2F2;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
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

const DetailView = () => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

    const { id } = useParams()
    console.log('id in detail view --',id)
    const dispatch = useDispatch();
    const { product, loading } = useSelector(state => state.productDetail)
    const { cloth } = useSelector(state => state.clothDetail)
    console.log('data in detailview-----', product, 'cloth--', cloth)
    useEffect(() => {
        dispatch(getProductDetails(id))
        dispatch(getClothDetails(id))
    }, [dispatch, id])


    return (
        <>
            {loading &&
               <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100vh' }}>
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
            }
        {
            product ?   <>

            <Component>
                {product && Object.keys(product).length &&
                    <Container container>
                        <Grid item lg={4} md={4} sm={8} xs={12}>
                            <ActionItem product={product} cloth={cloth} />
                        </Grid>
                        <RightContainer item lg={7} md={8} sm={8} xs={12}>
                            <Typography>{product.title.longTitle}</Typography>
                            <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}>
                                8 Ratings & 1 Reviews
                                <span><img src={fassured} style={{ width: 77, marginLeft: 20 }} /></span>
                            </Typography>
                            <Typography>
                                <span style={{ fontSize: 28 }}><FormatPrice price= {product.price.cost}/></span>&nbsp;&nbsp;&nbsp;
                                <span style={{ color: '#878787' }}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                                <span style={{ color: '#388E3C' }}>{product.price.discount} off</span>
                            </Typography>
                            <ProductDetail product={product} cloth={cloth}  />
                        </RightContainer>
                    </Container>
                }
            </Component>
        </>
             :<Component>
             {cloth && Object.keys(cloth).length &&
                 <Container container>
                     <Grid item lg={4} md={4} sm={8} xs={12}>
                     <ActionItem product={product} cloth={cloth} />
                     </Grid>
                     <RightContainer item lg={7} md={8} sm={8} xs={12}>
                         <Typography>{cloth.title.longTitle}</Typography>
                         <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}>
                             8 Ratings & 1 Reviews
                             <span><img src={fassured} style={{ width: 77, marginLeft: 20 }} /></span>
                         </Typography>
                         <Typography>
                             <span style={{ fontSize: 28 }}>₹{cloth.price.cost}</span>&nbsp;&nbsp;&nbsp;
                             <span style={{ color: '#878787' }}><strike>₹{cloth.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                             <span style={{ color: '#388E3C' }}>{cloth.price.discount} off</span>
                         </Typography>
                         <ProductDetail product={product} cloth={cloth}  />
                     </RightContainer>
                 </Container>
             }
         </Component>
        }
          
        </>
    )
}

export default DetailView