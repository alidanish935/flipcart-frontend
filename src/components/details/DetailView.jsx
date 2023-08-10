import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../redux/actions/productActions';
import { Box, Grid, Typography, styled } from '@mui/material';
import ActionItem from './ActionItem';
import ProductDetail from './ProductDetail';
import CircularIndeterminate from '../../Spinner';


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
    const dispatch = useDispatch();
    const {product,loading} = useSelector(state => state.productDetail)
    console.log('data in detailview-----', product,'loading--',loading)
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch,id])

    
    return (
        <>
        
        {loading && <CircularIndeterminate/>}
        <Component>
        {  product && Object.keys(product).length &&
            <Container container> 
                <Grid item lg={4} md={4} sm={8} xs={12}>
                    <ActionItem product={product} />
                </Grid>
                <RightContainer item lg={7} md={8} sm={8} xs={12}>
                    <Typography>{product.title.longTitle}</Typography>
                    <Typography style={{marginTop: 5, color: '#878787', fontSize: 14 }}>
                        8 Ratings & 1 Reviews
                        <span><img src={fassured} style={{width: 77, marginLeft: 20}} /></span>
                    </Typography>
                    <Typography>
                        <span style={{ fontSize: 28 }}>₹{product.price.cost}</span>&nbsp;&nbsp;&nbsp; 
                        <span style={{ color: '#878787' }}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                        <span style={{ color: '#388E3C' }}>{product.price.discount} off</span>
                    </Typography>
                    <ProductDetail product={product} />
                </RightContainer>
            </Container>
        }   
    </Component>
    </>
    )
}

export default DetailView