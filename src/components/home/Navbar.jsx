import React from 'react'
import {navData} from '../constants/data'
import { Box, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom'

const Component = styled(Box)(({theme})=>({
    display:'flex',
    margin:'55px 130px 0 130px',
    justifyContent:'space-between',
    overflow:'overlay',
    [theme.breakpoints.down('lg')]:{
        margin:0,
        
    }
}))
    

const Container=styled(Link)`
    padding: 12px 8px;
    text-align:center;
    text-decoration: none;

`
const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit
`
const Navbar = () => {
    return (
        <Component >
            {
                navData.map((item) => (
                    <Container to={`navdetail/${item.text}`}>
                        <img src={item.url} alt='nav' style={{width:64,height:80}}  />
                        <Text>{item.filter} </Text>
                    </Container>
                ))
            }
        </Component>
    )
}

export default Navbar