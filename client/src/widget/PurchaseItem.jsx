import React from 'react'
import { Box,Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { formatQuerency } from 'uitils/formatQuerency';

const PurchaseItem = ({item}) => {
  const navigate = useNavigate();
  const purchaseDetail=(item)=>{
    navigate("/purchaseDetail",{state: item})
  }

  return (
    <Box 
      sx={{borderBottom:"1px solid #efefef"}} 
      onClick={()=>purchaseDetail(item)}
    >
      <Grid container 
        sx={{
          display:"flex", 
          alignItems:"center", 
          textAlign:"center", 
          justifyContent:"center", 
          backgroundColor:"#fff", 
          padding:"16px",
        }}
      >
      <Grid item xs={12} sm={2} >
        <Typography>{item.id}</Typography>
      </Grid>
      <Grid item xs={12} sm={4} >
        <Typography>{item.name}</Typography>
      </Grid>
      <Grid item xs={12} sm={2} >
        <Typography>{!item.deliveryDate ? "-" : item.deliveryDate}</Typography>
      </Grid>
      <Grid item xs={12} sm={2} >
        <Typography>{!item.trackingNumber ? "-" : item.trackingNumber}</Typography>
      </Grid>
      <Grid item xs={12} sm={2} >
        <Typography>{formatQuerency(item.totalPrice)}</Typography>
      </Grid>
    </Grid>
  </Box>
  )
}

export default PurchaseItem