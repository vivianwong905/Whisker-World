import { useNavigate } from "react-router-dom";
import { useGetCatProductsQuery } from "../redux/api";
import React from "react";
import { Button, Box, Card, CardActions, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import NewProductForm from "./NewProductForm";

import { useSelector } from "react-redux";

const Products = () => {
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate();

  const { data: products, isLoading, error } = useGetCatProductsQuery();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (

    <Box>
      {user?.admin && <NewProductForm />}
      <Typography variant="h3" sx={{ marginLeft: 14 }} >Cat Products</Typography>
      {error && !products && (<p> Failed to load products from api</p>)}
      <Grid container spacing={4} sx={{ marginLeft: 10 }}>
        {products ? (
          products.map((product) => {
            return (
              <Grid item key={product.name} >
                <Card sx={{ maxWidth: 350, minWidth: 350, maxHeight: 450, minHeight: 450 }} >
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="250"
                    image={product.imageUrl}
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>{product.name}</Typography>
                    <Typography sx={{ textAlign: "center" }}><b>Price:</b>${product.price}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => navigate("/" + product.id)} >Cat Product Info</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })) : !error && <p>Loading...</p>}

      </Grid>
    </Box>
  )
}

export default Products;
