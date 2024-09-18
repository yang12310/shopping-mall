import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Product from './Product';
import { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([])
  
  useEffect(()=>{
    const getProducts = async () => {
      const response = await fetch("http://localhost:3500/products", {
        method: "GET",
      });
      const data = await response.json();
    setProducts(data);
    };
    getProducts();
  },[])

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {products?.map((product)=>{
          return (
          <Grid item
            key={product._id}
            xs={12} sm={4}>
            <Product 
             id={product._id}
              picturePath={product.picturePath}
              name={product.name}
              desc={product.desc}
              boxing={product.boxing}
              size={product.size}
              price={product.price}
              weight={product.weight}
            />
          </Grid>
          )
        })}
      </Grid>
    </Box>

  )
}

export default ProductList