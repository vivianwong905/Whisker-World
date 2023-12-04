import { useNavigate } from "react-router-dom";
import { useGetCatProductsQuery, useDeleteCatProductMutation, useCreateCartItemsInCartMutation } from "../redux/api";
import React, { useState } from "react";
import { Button, Box, Card, CardActions, CardContent, CardMedia, Typography, Grid, TextField } from "@mui/material";
import NewProductForm from "./NewProductForm";
import { useSelector, useDispatch } from "react-redux";
import Filters from "./Filters";
import { addToCart } from "../redux/cartSlice";


const Products = () => {
  const { user, token } = useSelector(state => state.auth)
  const { price, category } = useSelector(state => state.filter);

  const navigate = useNavigate();

  const { data: products, isLoading, error } = useGetCatProductsQuery(price ?? undefined); // if price is truthy pass it, otherwise pass undefined
  const [deleteCatProduct] = useDeleteCatProductMutation();
  const [createCartItemsInCart] = useCreateCartItemsInCartMutation();

  const dispatch = useDispatch()

  const [searchQuery, setSearchQuery] = useState("")



  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (

    <Box>
      <TextField
        id="outlined-basic"
        variant="filled"
        label="Search"
        placeholder="Search Products Here..."
        onChange={event => setSearchQuery(event.target.value)}
        sx={{ marginLeft: 4, marginTop: 1, padding: 2 }}
      />
      <Grid container spacing={4} sx={{ marginLeft: 2 }}>
        <Grid item  >
          <Filters />
        </Grid>
        <Grid item >
          {user?.admin && <NewProductForm />}
        </Grid>
      </Grid>
      <Typography variant="h3" sx={{ marginLeft: 6, marginTop: 2, marginBottom: 2 }} >Cat Products</Typography>
      {error && !products && (<p> Failed to load products from api</p>)}
      <Grid container spacing={4} sx={{ marginLeft: 2 }}>
        {products ? ( // sort the products in alphabetical order and then filter when the person is searching in the search bar
          products.slice().sort((a, b) => a.name.localeCompare(b.name))
            .filter(product => {
              if (searchQuery === '') {
                return product
              } else if (product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return product;
              }
            })
            .filter(product => {
              if (category.length === 0) { // category is an array
                return true //this means no filter, so show it 
              } else {
                return category.includes(product.category)
              }
            })
            //commenting out below as this is an example of how to do this price filter in the FE
            // .filter(product => {
            //   return !price || (price && product.price <= price)
            // })
            .map((product) => {
              return (
                <Grid item key={product.name} >
                  <Card sx={{ maxWidth: 400, minWidth: 400, maxHeight: 450, minHeight: 450, padding: 2 }} >
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="250"
                      image={product.imageUrl}
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ textAlign: "center", textTransform: "capitalize" }}>{product.name}</Typography>
                      <Typography sx={{ textAlign: "center" }}><b>Price:</b>${product.price}</Typography>
                      <Typography sx={{ textAlign: "center" }}><b>Category:</b>{product.category}</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "white" }, maxWidth: 80, minWidth: 80, maxHeight: 80, minHeight: 80 }} onClick={() => navigate("/" + product.id)}>Product Info</Button>
                      {user?.admin && <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "white" }, maxWidth: 80, minWidth: 80, maxHeight: 80, minHeight: 80 }} onClick={() => deleteCatProduct(product.id)}>Delete Product</Button>}
                      {user?.admin && <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "white" }, maxWidth: 80, minWidth: 80, maxHeight: 80, minHeight: 80 }} onClick={() => navigate("/admin", { state: product })}>Update Product</Button>}
                      {!user && <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "white" }, maxWidth: 80, minWidth: 80, maxHeight: 80, minHeight: 80 }} onClick={() => dispatch(addToCart({ ...product }))}>Add to Cart</Button>}
                      {token && <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "white" }, maxWidth: 80, minWidth: 80, maxHeight: 80, minHeight: 80 }} onClick={() => createCartItemsInCart({ quantity: 1, productId: product.id })}>Add to Cart</Button>}
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
