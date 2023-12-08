import { useNavigate } from "react-router-dom";
import { useGetCatProductsQuery, useDeleteCatProductMutation, useCreateCartItemsInCartMutation } from "../redux/api";
import React, { useState } from "react";
import { Button, Box, Card, CardActions, CardContent, CardMedia, Typography, Grid, TextField, Paper, Snackbar, IconButton, Alert, AlertTitle } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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

  // snack bar message
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  // for the snack bar box
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={4} sx={{ marginLeft: 2 }}>
        <Grid item>
          <Typography variant="h3" sx={{ marginLeft: 6, marginTop: 2, marginBottom: 2, maxWidth: 350 }} >Cat Products</Typography>
        </Grid>
        <Grid item>
          <Paper sx={{ maxWidth: 250, marginLeft: 6, maxHeight: 100, marginTop: 2 }} >
            <TextField // search bar
              id="outlined-basic"
              variant="outlined"
              label="Search"
              placeholder="Search Products Here..."
              onChange={event => setSearchQuery(event.target.value)}
              sx={{ width: "100%" }}
            />
          </Paper>
        </Grid>
        <Grid item sx={{ marginTop: 2 }} >
          <Filters />
        </Grid>
        <Grid item >
          {user?.admin && <NewProductForm />}
        </Grid>
      </Grid>
      {error && !products && (<Typography> Failed to load products from api</Typography>)}
      <Grid container spacing={4} sx={{ marginLeft: 2 }}>
        {products ? ( // sort the products in alphabetical order and then filter when the person is searching in the search bar
          products.slice().sort((a, b) => a.name.localeCompare(b.name))
            .filter(product => {
              if (searchQuery === '') {
                return product
                //this is the search bar what you can search for either the product name or category
              } else if (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase())) {
                return product;
              }
            })
            .filter(product => {// this is the filter checkbox or drop down menu
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
                      {!user && <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "white" }, maxWidth: 80, minWidth: 80, maxHeight: 80, minHeight: 80 }} onClick={() => { dispatch(addToCart({ ...product })); handleClick() }}>Add to Cart</Button>}
                      {token && <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "white" }, maxWidth: 80, minWidth: 80, maxHeight: 80, minHeight: 80 }} onClick={() => { createCartItemsInCart({ quantity: 1, productId: product.id }); handleClick() }}>Add to Cart</Button>}
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        action={action}
                      >
                        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                          <AlertTitle>Success</AlertTitle>
                          Product Added To cart!
                        </Alert>
                      </Snackbar>
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
