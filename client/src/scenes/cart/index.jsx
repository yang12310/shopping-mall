import React, { useState } from 'react'
import { Box,Typography, Button} from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import CartItem from 'widget/CartItem'
import { emptyToCart } from 'state'
import { formatQuerency } from 'uitils/formatQuerency'
import { setPageTitle } from 'state'
import { useEffect } from 'react'
import OneButtonModal from 'widget/OneButtonModal'
import {useNavigate } from 'react-router-dom'
import { selectorUser } from 'state'

const CartPage = () => {
  const cartItems = useSelector((state)=>state.auth.carts)
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectorUser)
  const [open, setOpen] = useState(false)
  const totalPrice = cartItems.reduce((total,item)=>{
    total += item.quantity * item.price
    return total
  },0)

  useEffect(()=>{
    dispatch(setPageTitle("Cart"))
  },[])

  const onGoPage=()=>{
    dispatch(emptyToCart())
    setOpen(false);
    navigate("/mypage")
  }

  const checkout = async() => {
    const today = new Date()
    const purchaseItem = {
      name:user.name,
      email:user.email,
      phone:user.phone,
      purchaseDate:today.toLocaleString(),
      deliveryDate:"",
      trackingNumber:"",
      totalPrice:totalPrice,
      contents:[...cartItems]
    }
    const response = await fetch("http://localhost:3500/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(purchaseItem),
    });

    if(response.ok){
      setOpen(true)
      // dispatch(emptyToCart());
    }
  }


  return (
    <>
      {cartItems.map((item)=>(
        <CartItem 
          key={item.id}
          item={item}
        />
      ))
      }
      <Box 
        display="flex" 
        justifyContent="space-around" 
        mt="60px" 
        p="32px" 
        backgroundColor="#DDD"
      >
        <Typography fontSize="24px" fontWeight="300">총 합계 :</Typography>
        <Typography fontSize="24px" fontWeight="600">{formatQuerency(totalPrice)}</Typography>
        <Button variant="contained" onClick={checkout}
          sx={{background:"#000", color:"#FFF",borderRadius:"0px"}}
        >
          Check Out
        </Button>
      </Box>
      <OneButtonModal 
        open={open}
        setOpen={setOpen}
        title={"알림"}
        message={"구매가 완료되었습니다."}
        onGoPage={onGoPage}
        buttonText={"닫기"}
      />
    </>
  )
}

export default CartPage