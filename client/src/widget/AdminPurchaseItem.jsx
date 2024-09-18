import React from 'react'
import { Box,Button,Grid, Typography } from '@mui/material'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatQuerency } from 'uitils/formatQuerency';
import { LuFileInput, LuFileEdit, LuTrash2 } from "react-icons/lu";
import DeleteModal from 'widget/DeleteModal';


const AdminPurchaseItem = ({item, deleteClick, setOpen, open}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AdminPurchaseDetailItem=(item)=>{
    // navigate("/adminPurchaseDetail",)
    navigate("/adminPurchaseDetail",{state: item})
  }

  const newDisabled = item.deliveryDate && item.trackingNumber ? true : false
  const editDisabled = item.deliveryDate && item.trackingNumber ? false : true
  const deleteDisabled = item.deliveryDate && item.trackingNumber ? true : false
  const color = newDisabled? "blue" : "black"

  const handleClickOpen = () => {
    setOpen(true);
  };



  return (
    <Box 
      sx={{borderBottom:"1px solid #efefef"}} 
    >
      <Grid container 
        sx={{
          display:"flex", 
          alignItems:"center", 
          textAlign:"center", 
          justifyContent:"center", 
          backgroundColor:"#fff", 
          padding:"16px",
          color:{color}
        }}
      >
      <Grid item xs={12} sm={2} >
        <Typography>{item.id}</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography>{item.name} </Typography>
      </Grid>
      <Grid item xs={12} sm={2} >
        <Typography>{!item.deliveryDate?"-" :item.deliveryDate}</Typography>
      </Grid>
      <Grid item xs={12} sm={2} >
        <Typography>{!item.trackingNumber?"-" :item.trackingNumber}</Typography>
      </Grid>
      <Grid item xs={12} sm={1} >
        <Typography>{formatQuerency(item.totalPrice)}</Typography>
      </Grid>

      <Grid item xs={12} sm={1} >
        <Button 
          disabled = {newDisabled} 
          onClick={()=>AdminPurchaseDetailItem(item)}
          sx={{padding:"0", minWidth:"auto", border:"none", color:"#0c9c64"}}
          variant="outlined" 
          startIcon={
            <LuFileInput size="24" sx={{margin:"0 auto", }}/>
          }
        >
        </Button>
        <Button 
          disabled ={editDisabled} 
          onClick={()=>AdminPurchaseDetailItem(item)}
          sx={{padding:"0", minWidth:"auto", border:"none",color:"#0c9c64"}}
          variant="outlined" 
          startIcon={
            <LuFileEdit size="24" sx={{margin:"0 auto"}}/>
          }
        >
        </Button>
        <Button 
          disabled ={deleteDisabled} 
          onClick={()=>handleClickOpen()}
          sx={{padding:"0", minWidth:"auto", border:"none", color:"#0c9c64"}}
          variant="outlined" 
          startIcon={
            <LuTrash2 size="24" sx={{margin:"0 auto"}}/>
          }
        >
        </Button>
      </Grid>
    </Grid>

    <DeleteModal 
      open={open}
      setOpen={setOpen}
      title={"삭제"}
      message={"삭제하시겠습니까?"}
      deleteClick ={deleteClick}
      handleClickOpen={handleClickOpen}
      purchaseId={item._id}
    />
  </Box>
  )
}

export default AdminPurchaseItem