import { Typography, Box, Button, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useGetUsersCartQuery, useUpdateUsersCartMutation, useDeleteCartItemsInCartMutation } from "../redux/api";
import { useNavigate } from "react-router-dom";

const LoggedInCartItem = () =>{
    const { user } = useSelector(state => state.auth);
    const { data: loggedInCart, isLoading, error } = useGetUsersCartQuery();

    const [deleteCartItemsInCart] = useDeleteCartItemsInCartMutation();
    const [updateUsersCart] = useUpdateUsersCartMutation();

    const handleIncrement = (cartItem) => {
        const newQuantity = cartItem.quantity + 1;
        updateUsersCart({ cartItemId: cartItem.id, quantity: newQuantity });
      };
    
      const handleDecrement = (cartItem) => {
        const newQuantity = cartItem.quantity - 1;
        updateUsersCart({ cartItemId: cartItem.id, quantity: newQuantity });
      };
    
      if (user && isLoading) {
        return <Typography>Loading...</Typography>;
      }
      if (user && error) {
        return <Typography color="error">Error: {error.message}</Typography>;
      }

      return (
        <>
          <Box>
            <Grid container spacing={4}>
              {user && loggedInCart?.cartItems?.length // this is to make sure that checking for null along the way - cart? and cartItems?
                //any of these are undefined - then will display cart as empty
                ? loggedInCart.cartItems.slice().sort((a, b) => a.product.name > b.product.name ? 1 : -1).map(cartItem => {
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
                          <Button variant="contained" onClick={() => deleteCartItemsInCart(cartItem.id)} > Remove Item </Button>
                          <Button variant="contained" onClick={() => handleIncrement(cartItem)} > + </Button>
                          <Button variant="contained" onClick={() => handleDecrement(cartItem)} disabled={cartItem.quantity === 1}> - </Button>
                        </CardActions>
                      </Card>
                    </Grid>)
                })
                : (
                  user && <Typography variant="h3" sx={{ padding: 10 }}>
                    Your cart is empty
                  </Typography>
                )}
             </Grid>
          </Box>
        </>
      );
}

export default LoggedInCartItem;