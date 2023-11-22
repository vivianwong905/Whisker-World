
import { Typography, Paper, Button, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetUsersCartQuery, useUpdateUsersCartMutation, useDeleteCartItemsInCartMutation } from "../redux/api";
import { useNavigate } from "react-router-dom";
import CheckoutCartButton from "./CheckoutCartButton";


const Cart = () => {
  const { user } = useSelector(state => state.auth);
  const { data: cart, isLoading, error } = useGetUsersCartQuery();

  const navigate = useNavigate();
  const [deleteCartItemsInCart] = useDeleteCartItemsInCartMutation();
  const [updateUsersCart] = useUpdateUsersCartMutation();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography color="error">Error: You must be logged in to preform this action</Typography>;
  }

  return (
    <>
      <Paper elevation={6}>
        <Typography variant="h3" sx={{ marginLeft: 14 }} >Welcome to {user.name}'s Cart</Typography>
        <Grid container spacing={4}>
          {cart?.cartItems?.length // this is to make sure that checking for null along the way - cart? and cartItems?
            //any of these are undefined - then will display cart as empty
            ? cart.cartItems.map(cartItem => {
              return (
                <Grid item key={cartItem.id} >
                  <Card sx={{ maxWidth: 350, minWidth: 350, maxHeight: 450, minHeight: 450 }} >
                    <CardMedia
                      component="img"
                      alt={cartItem.product}
                      height="250"
                      image={cartItem.product.imageUrl}
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ textAlign: "center" }}>{cartItem.product.name}</Typography>
                      <Typography sx={{ textAlign: "center" }}><b>Price:</b>${cartItem.product.price}</Typography>
                      <Typography sx={{ textAlign: "center" }}><b>Quantity:</b>{cartItem.quantity}</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button variant="contained" onClick={() => deleteCartItemsInCart(cartItem.id)} > Delete </Button>
                      <Button variant="contained" onClick={() => updateUsersCart(cartItem.id)} > Add </Button>
                      {/* add update quantity and delete jsx - reference singleProduct jsx */}

                    </CardActions>
                  </Card>
                </Grid>)
            })
            : (
              <Typography variant="h3" sx={{padding: 10}}>
                Your cart is empty
              </Typography>
            )}
        </Grid>
        <Typography sx={{padding: 2}}>
          Click here to<Button onClick={() => { navigate('/') }}>continue shopping</Button>
        </Typography>
        <CheckoutCartButton cartId={cart.id} />
      </Paper>
    </>
  );
};

export default Cart;
