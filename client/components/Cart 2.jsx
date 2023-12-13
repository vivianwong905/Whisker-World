import { Link as RouterLink } from "react-router-dom"
import { Typography, Paper, Button, Grid, Link, Tooltip, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, resetCart } from "../redux/cartSlice";
import { useEffect } from "react";
import GuestCartItem from "./GuestCart/GuestCartItem";
import LoggedInCartItem from "./LoggedInCart/LoggedInCartItem";

const Cart = () => {
  const { user } = useSelector(state => state.auth);
  const { items: guestCart, cartCheckedOut } = useSelector(state => state.cart)

  const dispatch = useDispatch();
  // this is for the guest checkout cart button
  useEffect(() => {// clean up function is when the component is unmounted 
    return () => {
      dispatch(resetCart())
    }
  }, [dispatch, resetCart])

  return (
    <>
      <Paper elevation={6}>
        <Typography variant="h3" sx={{ marginLeft: 2, padding: 2 }} >Welcome to your cart, {user ? `${user.name}` : " guest"}!</Typography>
        <Grid container spacing={4}>
          {user && <Grid item>
            <LoggedInCartItem />
          </Grid>}
          {!user && guestCart?.length ? (guestCart.map((item) => (
            <Grid item key={item.id} >
              <GuestCartItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            </Grid>
          ))) : (
            !user && !cartCheckedOut && <Typography variant="h3" sx={{ marginLeft: 7.5, padding: 1 }}>
              Your cart is empty
            </Typography>
          )}
        </Grid>
        {/* success order message for guest cart */}
        {cartCheckedOut && <Stack direction="row">
          <Typography sx={{ padding: 1, marginLeft: 3, marginTop: 2 }} variant="h5">
            Thank you for shopping at Whisker World! Your order will ship soon!
          </Typography>
        </Stack>}
        {!user && <Typography variant="h6" sx={{ padding: 2, marginLeft: 3.5 }}>
          Click here to <Link href="#" component={RouterLink} to="/">continue shopping</Link>
        </Typography>}
        {/* guest cart checkout button or disabled button if cart empty*/}
        {!user && guestCart.length > 0 ? (<Button
          onClick={() => dispatch(clearCart())}
          variant="contained"
          sx={{ margin: 2, marginLeft: 4.5, padding: 2, "&:hover": { bgcolor: "magenta", color: "white" } }}
        >
          Check Out
        </Button>)
          : (!user &&
            <Tooltip title={<Typography>Add Items to the cart to checkout!</Typography>} placement="bottom-start" >
              <div>
                <Button disabled variant="contained" sx={{ margin: 2, padding: 2, marginLeft: 5, opacity: 0.5 }}>
                  Checkout
                </Button>
              </div>
            </Tooltip>
          )}
      </Paper>
    </>
  );
};

export default Cart;
