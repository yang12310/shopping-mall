import React, { useEffect, useState } from 'react'
import { Box,Grid, TextField, Typography, Button } from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import { setPageTitle } from 'state'
import AdminPurchaseItem from 'widget/AdminPurchaseItem'
import { addPurchases } from 'state/purchase'
import { deletePurchase } from 'state/purchase'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MyDatePicker from 'widget/MyDatePicker'

const AdminPage = () => {
  const [date, setDate] = useState()
  const [searchUser, setSearchUser] = useState("")
  const [searchTrackingNumber, setSearchTrackingNumber] = useState("")
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState([])
  const purchaseList = useSelector((state)=>state.purchase.purchases)
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const getPurchase = async (page) => {
    const sendDate = date ? String(date.year()) + String(date.month()+1).padStart(2, 0) + String(date.date()).padStart(2, 0) : ""
    const values = {
      date : sendDate,
      user : searchUser,
      trackingNumber : searchTrackingNumber
    }
    const response = await fetch(`http://localhost:3500/purchase/admin/${page}`,{
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(values),
    })
    const data = await response.json();
    dispatch(addPurchases(data.purchase))

    let tp = Math.floor(data.total / 10) + ((data.total % 10 >= 1) ? 1 : 0)
    setTotalPage(tp)
  }
  
  useEffect(()=>{
    getPurchase(page);
    dispatch(setPageTitle("관리자 주문내역"))
  },[page])

  const deleteClick = (purchaseId) => {
    const movePage = page > 1 && purchaseList.length <= 1 ? page -1 : page
    setOpen(false);
    const deliveryDelete = async () => {
      const response = await fetch(`http://localhost:3500/admin/delete/${purchaseId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const deleted = await response.json();
      dispatch(deletePurchase(purchaseId))    
    };
    deliveryDelete();
    getPurchase(movePage)
   }

   const handleChange = (event, value) => {
     setPage(value);
     getPurchase(value)
     
   };

  return (
    <>
      <Grid container sx={{marginBottom:"32px"}}>
        <Grid item sm={3} sx={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
          <Typography>주문날짜</Typography>
          <MyDatePicker 
            sx={{width:"auto"}}
            value={date} 
            setDate={setDate}
            today={null}
          />
        </Grid>
        <Grid item sm={3} sx={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
          <Typography>사용자</Typography>
          <TextField 
            onChange = {(e)=> setSearchUser(e.target.value)}
            value={searchUser}
          />
        </Grid>
        <Grid item sm={3} sx={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
          <Typography>운송장번호</Typography>
          <TextField 
            onChange = {(e)=> setSearchTrackingNumber(e.target.value)}
            value={searchTrackingNumber}
          />
        </Grid>
        <Grid item sm={3} sx={{display:"flex", alignItems:"center", justifyContent:"space-around"}}>
          <Button 
            variant="contained"
            onClick={()=> getPurchase(page)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
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
        <Grid item xs={2} sm={1} >
          <Typography>합계</Typography>
        </Grid>
        <Grid item xs={3} sm={1} >
          <Typography>합계</Typography>
        </Grid>
    </Grid>
      {purchaseList?.map((item)=>(
        <AdminPurchaseItem
          key={item._id}
          item={item}
          deleteClick={()=>deleteClick(item._id)}
          open={open}
          setOpen={setOpen}
        />
      ))}
      </Box>
      <Stack 
        spacing={2}  
        sx={{marginTop:"70px", display:"flex", justifyContent: "center", alignItems: "center"}}>
        <Pagination
          count={totalPage}
          page={page}
          hidePrevButton
          hideNextButton
          showFirstButton
          showLastButton
          onChange={handleChange}
          siblingCount={1}
          boundaryCount={0}
          color="primary"
          variant="outlined"
        />
      </Stack>
    </>
    
  )
}

export default AdminPage