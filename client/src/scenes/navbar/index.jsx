import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useSelector,useDispatch } from 'react-redux';
import { setLogout } from 'state';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // 추가
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const carts = useSelector((state)=> state.auth.carts)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginLogout=()=>{
    // debugger;
    if(token){
      dispatch(setLogout())
      navigate("/")
    }else{

      navigate("/login")
    }
  }
  const home = () => {
    navigate("/");
  };

  const admin = () => {
    navigate("/admin");
  };

  const cart = () => {
    navigate("/cart");
  };

  const mypage = () => {
    navigate("/mypage");
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={mypage}>주문내역</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user?.name=="admin"?
         <MenuItem onClick={admin}>
          <p>ADMIN</p>
        </MenuItem>
        : null
      }
      <MenuItem>
        <p>PRODUCTS</p>
      </MenuItem>
      { user ? 
       <MenuItem onClick={handleProfileMenuOpen}>
        <p>MYPAGE</p>
       </MenuItem>
      :
      null
      }
     
      <Button color="inherit" onClick={loginLogout}>
        {token ? "LOGOUT" : "LOGIN"}
      </Button>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1,}}>
      <AppBar position="fixed" 
        sx={{ 
          justifyContent:"center",
          minHeight:"72px",
          backgroundColor:"#FFF", 
          color:"#131313",   
          boxShadow: "none",
          border:"1px solid #000"
        }}
      >
        <Toolbar sx={{maxWidth:"96.5%", width:"1200px",margin:"0 auto"}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            한림명란
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {/* 장바구니 */}
          <Box sx={{position:"relative",marginRight:"16px"}} onClick={cart}>
            <FaShoppingCart fontSize="22px"/>
            <Box sx={{position:"absolute", right:"-10px", top:"-4px", }}width="17px" height="17px" backgroundColor="red" borderRadius="50%"> 
              <Typography fontSize="12px" sx={{paddingLeft:"4px", color:"#FFF"}}>
                {carts.length}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {user?.name=="admin"?
              <Button color="inherit" onClick={admin}>
              Admin
            </Button>:null
            }
          
            <Button color="inherit" onClick={home}>
              Products
            </Button>

            {user ? 
            <Button
              aria-controls={menuId}
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              MYPAGE
            </Button>
            : null
            }
            
            <Button color="inherit" onClick={loginLogout}>
              {token ? "Logout" : "Login"}
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
