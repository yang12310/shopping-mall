import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Typography,Box } from '@mui/material'
import NavBar from 'scenes/navbar';
import { useSelector } from 'react-redux';
import FlexBetween from 'components/FlexBetween';
import { selectorUser } from 'state';

const Layout = () => {
  const user = useSelector(selectorUser)
  const pageTitle = useSelector((state)=>state.auth.pageTitle)

  return (
    <>
      <Container className='container'>
        <Box className='outlinebox'>
          <NavBar />
          <FlexBetween sx={{marginBottom:"40px", border:"1px solid #000"}}>
            <Typography 
              sx={{
                fontSize:"24px", 
                fontWeight:"600",
                color:"#fff", 
                padding:"8px 40px", 
                background:"#131313"
              }}
            >
              {pageTitle}
            </Typography>
            {user?  
            <Typography sx={{paddingRight:"24px"}}>Logged In: {user.name}</Typography>
            : null
          }
          </FlexBetween> 
          <Outlet />
        </Box>
      </Container>
    
    </>


  
  )
}

export default Layout