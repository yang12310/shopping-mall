import React from 'react'
import { Box,Grid, Typography } from '@mui/material'
import { formatQuerency } from 'uitils/formatQuerency';



const PurchaseDetailItem = ({item}) => {
  
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
          border:"1px solid #000", 
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
      <Grid item container xs={6} sm={2}>
        <Grid item xs><Typography>{item.quantity}</Typography> 
      </Grid>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography>{formatQuerency(item.price*item.quantity)}</Typography>
      </Grid>
    </Grid>
  </Box>
  )
}

export default PurchaseDetailItem