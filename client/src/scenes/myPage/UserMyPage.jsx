import React, { useEffect } from 'react'
import { Box,Grid, Typography, } from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import PurchaseItem from 'widget/PurchaseItem'
import { setPageTitle, selectorUser } from 'state'
import { addPurchases } from 'state/purchase'

const UserMyPage = () => {
  const purchaseList = useSelector((state)=>state.purchase.purchases)
  const cartItems = useSelector((state)=>state.auth.carts)
  const user = useSelector(selectorUser)
  const token = useSelector((state) => state.auth.token);
  const totalPrice = cartItems.reduce((total,item)=>{
    total += item.quantity * item.price
    return total
  },0)
  const dispatch = useDispatch();
  useEffect(()=>{
    const getUserPurchase = async () => {
        const response = await fetch(
        `http://localhost:3500/purchase/user/${user.email}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(addPurchases(data));
    }
    getUserPurchase();
    dispatch(setPageTitle("주문내역"))
  },[])

  return (
    <Box sx={{border:"1px solid #000"}}>
      <Grid container 
        sx={{
          display:"flex",
          padding:"16px",
          alignItems:"center", 
          textAlign:"center", 
          justifyContent:"center", 
          backgroundColor:"#EFEFEF", 
          borderBottom:"2px solid #000"
          }}
        >
        <Grid item xs={5} sm={2} >
          <Typography>고유번호</Typography>
        </Grid>
        <Grid item xs={5} sm={4} >
          <Typography>고객명</Typography>
        </Grid>
        <Grid item xs={5} sm={2} >
          <Typography>배송날짜</Typography>
        </Grid>
        <Grid item xs={5} sm={2} >
          <Typography>운송장번호</Typography>
        </Grid>
        <Grid item xs={5} sm={2} >
          <Typography>합계</Typography>
        </Grid>
    </Grid>
      { purchaseList?.length != 0 ? 
       purchaseList?.map((item)=>(
        <PurchaseItem
          key={item._id}
          item={item}
        />
      ))
      :
      <Typography sx={{textAlign:"center", padding:"16px"}}>주문내역이 없습니다.</Typography>
      }

     
    </Box>
  )
}

export default UserMyPage