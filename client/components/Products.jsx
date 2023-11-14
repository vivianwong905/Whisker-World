import { useGetCatProductsQuery } from '../redux/api'

import React from 'react';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';


const Products = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCatProductsQuery();

  console.log("all the product", data)
  return (
    <>
      <div className="products">
        <h1>this is the Products component</h1>
    
      </div>
      <Box>
        <Card>
        <CardActions>
          <Button onClick={() => navigate("/" + data.id)} >Cat Product Info</Button>
        </CardActions>
      </Card>
    </Box >
    </>
  );
};

export default Products;
