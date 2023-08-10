import React from 'react'
import {navData} from '../constants/data'
import { Box, Typography, styled } from '@mui/material'

const Component = styled(Box)(({theme})=>({
    display:'flex',
    margin:'55px 130px 0 130px',
    justifyContent:'space-between',
    overflow:'overlay',
    [theme.breakpoints.down('lg')]:{
        margin:0,
        
    }
}))
    

const Container=styled(Box)`
    padding: 12px 8px;
    text-align:center
`
const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit
`
const Navbar = () => {
    return (
        <Component>
            {
                navData.map((item) => (
                    <Container>
                        <img src={item.url} alt='nav' style={{width:64}} />
                        <Text>{item.text} </Text>
                    </Container>
                ))
            }
        </Component>
    )
}

export default Navbar