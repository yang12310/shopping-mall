import React from 'react'
import { Box,Button,Grid, Typography,TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setPageTitle } from 'state';
import AdminDetailItem from 'widget/AdminDetailItem';
import { useEffect,useState } from 'react';
import MyDatePicker from 'widget/MyDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import MyModal from 'widget/Modal';
import { updatePurchase } from 'state/purchase';

const AdminPurchaseDetailPage = () => {
  const location = useLocation();
  const item = {...location.state}
  const purchaseId = item._id;
  const purchaseItems = item.contents;
  const token = useSelector((state) => state.auth.token);
  let initialDate
  let initialTrackingNumber
  let initialComments
  let mode

  if(item.deliveryDate && item.trackingNumber) {
  
    initialDate = item.deliveryDate
    initialTrackingNumber = item.trackingNumber
    initialComments = item.comments
    mode = "수정하기"

  } else {
    
    initialDate = new Date().toISOString().slice(0, 10)
    initialTrackingNumber = ""
    initialComments = ""
    mode = "입력하기"

  }

  const [date, setDate] = useState(dayjs(initialDate))
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber)
  const [comments, setComments] = useState(initialComments)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const totalPrice = purchaseItems.reduce((total,item)=>{
    total += item.quantity * item.price
    return total
  },0)

  const adminSave=async()=>{
    const today = new Date()
    const yymmdd = date.get("y") + "-" + (date.get("M")+1) + "-" + date.get("D")
    const deliveryDate = new Date(yymmdd)
    if (deliveryDate > today){
        setOpen(true)
      return
    }
    const update = {
      deliveryDate : yymmdd,
      trackingNumber : trackingNumber,
      comments : comments
    }

    const response = await fetch(`http://localhost:3500/admin/delivery/${purchaseId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(update),
    });
    if(response.ok){
      dispatch(updatePurchase(purchaseId))
      navigate("/admin")
    }

  }

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setPageTitle("주문상세내역"))
  },[])

  return (
    <Box>
      {purchaseItems?.map((item)=>
        <AdminDetailItem
          key={item.id}
          item={item}
        />
      )}
       <Box display="flex" justifyContent="space-around" mt="60px" p="32px" backgroundColor="#DDD">
        <Typography fontSize="24px" fontWeight="300">총 합계 :</Typography>
        <Typography fontSize="24px" fontWeight="600">{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Typography>
      {/* 배송날짜, 운송장번호, 코멘트 */}
      </Box>
      <Box sx={{marginTop:"40px"}}>
        <Grid container>
          <Grid item sm={6} sx={{padding:"0px 10px"}}>
            <MyDatePicker 
              value={date} 
              setDate={setDate}
              today={null}
            />
          </Grid>
          <Grid item sm={6} sx={{padding:"0px 10px"}}>
            <TextField 
              fullWidth 
              id="fullWidth" 
              placeholder='운송장 번호' 
              value={trackingNumber || ''} 
              onChange={(e)=>setTrackingNumber(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "1px solid #CCC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #CCC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #CCC",
                  },
                },
              }}
            />
          </Grid>
          <Grid item sm={12} sx={{padding:"0px 10px", paddingTop:"20px"}}>
            <TextField 
              value={comments} 
              onChange={(e)=>setComments(e.target.value)}
              id="outlined-multiline-static"
              placeholder='Comments'
              multiline
              maxRows={4}
              sx={{
                width:"100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                  border: "1px solid #CCC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #CCC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #CCC",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Box 
          sx={{
            marginTop:"24px",
            display:"flex;",
            marginRight:"10px",
            justifyContent:"flex-end"
            }}>
          <Button variant="contained" onClick={adminSave}>{mode}</Button>
        </Box>
      </Box>
      <MyModal 
        open={open}
        setOpen={setOpen}
        title={"알림"}
        message={"message"}
      />
    </Box>
  )
}

export default AdminPurchaseDetailPage