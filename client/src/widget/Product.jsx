import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectorUser } from 'state'
import SelectModal from './SelectModal';

export default function Product({id, picturePath, name, boxing, price, weight, size, desc}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [open, setOpen] = useState(false)
  const user = useSelector(selectorUser);

  const handleClick=()=>{
    if(token){
      const cartProduct = {
        id,
        picturePath,
        name, 
        boxing, 
        weight, 
        size, 
        price, 
      }
      dispatch(addToCart(cartProduct))
      navigate("/cart");
    } else{
      setOpen(true)
      // navigate("/login");
    }
  }

  const onGoPage = () => {
    navigate('/login');  // 원하는 경로로 이동
  };

  return (
    <Card sx={{ maxWidth: 345, border:"1px solid #000", borderRadius:"0px", boxShadow:"none", height:"100%" }}>
      <CardActionArea >
        <CardMedia
          component="img"
          height="160"
          image={`http://localhost:3500/assets/${picturePath}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" >
            {name}
          </Typography>
         
          <Grid container spacing={1}>
            <Grid item columns={{sx:12, sm:4}}>
              <Typography variant="body2" color="text.secondary">
                {boxing}
              </Typography>
            </Grid>
            <Grid item columns={{sx:12, sm:8}} >
              <Typography variant="body2" color="text.secondary">
                {weight}
              </Typography>
            </Grid>
            <Grid item columns={{sx:12, sm:12}}>
              <Typography variant="body2" color="text.secondary">
                {size}
              </Typography></Grid>
          </Grid>
          <Typography variant="body2" color="text.secondary">
            {price}
          </Typography>
          <Typography gutterBottom variant="body2" component="div" >
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {
          user?.name === "admin" ? null
           : 
           <Button 
           size="small" 
           sx={{ color: "#131313" }} 
           onClick={handleClick} 
         >
           카트에 담기
         </Button>
        }
      </CardActions>
      <SelectModal 
        open={open}
        setOpen={setOpen}
        title={"알림"}
        message={"로그인후 상품을 카트에 담으실 수 있습니다. 로그인하시겠습니까?"}
        onGoPage={onGoPage}
        buttonText={"로그인하기"}
      />
    </Card> 
  );
}