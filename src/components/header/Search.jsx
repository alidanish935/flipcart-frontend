import {useSelector,useDispatch} from 'react-redux'
import { Box, InputBase, List, ListItem, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react'
import { getProducts } from '../redux/actions/productActions';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 35%;
  background-color: #fff;
  display: flex;
`;
const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
  display: flex;
`;
const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;
const ListWrapper = styled(List)`
  position:absolute;
  background:#ffffff;
  color:black;
  margin-top:36px;
`
const Search = () => {
  const dispatch = useDispatch()
  const {products} = useSelector(state=>state.products)
  console.log('search product-------',products)
  const [text , setText]=useState('')
  const [open ,setOpen]=useState(true)

  const getText = (text)=>{
    setText(text)
    setOpen(false)
  }
  const listClick=()=>{
    setOpen(true)
    setText('')
  }
  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])
  return (
    <SearchContainer>
         <InputSearchBase 
         placeholder='  Search for products, brands and more '
         onChange={(e)=>getText(e.target.value)} value={text} />
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
        {
          text && 
              <ListWrapper hidden={open} >
                  {
                    products.filter((product)=>(
                      product.title.longTitle.toLowerCase().includes(text.toLocaleLowerCase())
                    )).map((product)=>(
                      <ListItem>
                        <Link to={`product/${product.id}`} style={{textDecoration:'none'}}
                        onClick={listClick} >
                        {product.title.longTitle}
                      </Link>
                      </ListItem>
                    ))
                  }
              </ListWrapper>
        }
    </SearchContainer>
  )
}

export default Search