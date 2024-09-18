import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { increaseCount, decreaseCount, inputCount } from 'state';
import { AiTwotonePlusCircle, AiTwotoneMinusCircle } from "react-icons/ai";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { formatQuerency } from 'uitils/formatQuerency';

const CartItem = ({item}) => {
  const carts = useSelector((state)=>state.auth.carts)
  const [quantity, setQuantity] = useState(item.quantity)
  const [mode, setMode] = useState(true)
  const dispatch = useDispatch();

  const increaseCounter = (item)=>{
    setMode(true)
    dispatch(increaseCount(item))
  }
  const decreaseCounter = (item)=>{
    setMode(true)
    dispatch(decreaseCount(item))
  }

  const HandleOnChange = (e) => {
    if(!isNaN(e.target.value)){
      setQuantity(Number(e.target.value));
    }
  };

  const HandleOnFocus = (e) => {
    setMode(false);
    setQuantity(e.target.value)
  };

  const HandleOnBlur = (e) => {
    let value = e.target.value.trim().replace(/^0+/, '')
    dispatch(inputCount({item, value:Number(value)}))
  };

  return (
    <Box sx={{marginTop:"16px",}}>
      <Grid container 
        sx={{
          display:"flex",
          padding:"16px",
          alignItems:"center", 
          textAlign:"center", 
          justifyContent:"center", 
          backgroundColor:"#fff", 
          border:"1px solid #000"
        }}
      >
      <Grid item xs={4} sm={2}>
        <img src={`http://localhost:3500/assets/${item.picturePath}`} style={{width:"100%"}}/>
      </Grid>
      <Grid item xs={5} sm={3} >
        <Typography>{item.name}</Typography>
        <Typography>{item.boxing}</Typography>
        <Typography>{item.size}</Typography>
      </Grid>
      <Grid item xs={3} sm={2}>
        <Typography>{formatQuerency(item.price)}</Typography>
      </Grid>
      <Grid item container xs={6} sm={2} sx={{display:"flex",alignItems: "center"}}>
        <Grid item xs>
          <AiTwotoneMinusCircle fontSize="26px" onClick={()=>{decreaseCounter(item)}}/>
        </Grid>
        <Grid item xs>
          <TextField 
            id = "outlined-basic" 
            variant="outlined" 
            value = {mode === true ? item.quantity : quantity} 
            onFocus = {(e) => HandleOnFocus(e)} 
            onChange = {(e) => HandleOnChange(e)} 
            onBlur = {(e) => HandleOnBlur(e)}
          />
          </Grid>
        <Grid item xs>
          <AiTwotonePlusCircle fontSize="26px" onClick={()=>{increaseCounter(item)}}/>
        </Grid>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography>{formatQuerency(item.price*item.quantity)}</Typography>
      </Grid>
    </Grid>
  </Box>
  )
}

export default CartItem