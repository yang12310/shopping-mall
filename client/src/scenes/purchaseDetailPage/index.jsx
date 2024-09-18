import React, { useEffect, useState } from 'react'
import { Box,Button,Typography,Grid } from '@mui/material'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PurchaseDetailItem from 'widget/PurchaseDetailItem';
import { setPageTitle } from 'state';
import { formatQuerency } from 'uitils/formatQuerency';
import DeleteModal from 'widget/DeleteModal';
import { deletePurchase } from 'state/purchase';



const PurchaseDetailPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  const item = location.state
  const purchaseItems = item.contents;
  const totalPrice = purchaseItems.reduce((total,item)=>{
    total += item.quantity * item.price
    return total
  },0)

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setPageTitle("주문상세내역"))
  },[])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteClick = (purchaseId)=>{
    setOpen(false);
    const userPurchaseDelete = async () => {
      const response = await fetch(`http://localhost:3500/admin/delete/${purchaseId}`, {
        method: "DELETE",
      });
      const deleted = await response.json();
      dispatch(deletePurchase(purchaseId))
    };
    userPurchaseDelete();
    navigate("/mypage")
  }



  return (
    <Box sx={{marginTop:"16px",}}>
      {purchaseItems.map((item)=>
        <PurchaseDetailItem 
          key={item.id}
          item={item}
        />
      )}
       <Box display="flex" justifyContent="space-around" mt="60px" p="32px" backgroundColor="#DDD">
        <Typography fontSize="24px" fontWeight="300">총 합계 :</Typography>
        <Typography fontSize="24px" fontWeight="600">{formatQuerency(totalPrice)}</Typography>
      </Box>
      <Grid container
        sx={{margin:"50px 0px 30px", display:"flex"}}
      >
        <Grid item sm={3}><Typography>배송날짜 : {item.deliveryDate}</Typography></Grid>
        <Grid item sm={3}><Typography>운송장번호 : {item.trackingNumber}</Typography></Grid>
        <Grid item sm={6}><Typography>Comments : {item.comments}</Typography></Grid>
      </Grid>
      <Button 
        onClick={handleClickOpen}
        disabled = {item.deliveryDate && item.trackingNumber ? true : false}
        sx={{display:"block", margin:"0 0 0 auto",color:"333", border:"1px solid #131313"}}
      >
        주문취소
      </Button>

      <DeleteModal 
        open={open}
        setOpen={setOpen}
        title={"주문취소"}
        message={"주문을 취소하시겠습니까?"}
        deleteClick={()=>deleteClick(item._id)}
      />
    </Box>
  )
}

export default PurchaseDetailPage