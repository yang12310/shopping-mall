
import ProductList from "widget/ProductList";
import {useDispatch } from "react-redux";
import { setPageTitle } from "state";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setPageTitle("Product"))
  },[])


  return (
    <div>
      <ProductList />
    </div>
  );
};

export default HomePage;
