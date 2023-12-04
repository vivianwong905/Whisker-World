
import { Typography, Paper, Button, Grid} from "@mui/material";
import { useSelector} from "react-redux";
import { useGetUsersCartQuery} from "../redux/api";
import { useNavigate } from "react-router-dom";
import CheckoutCartButton from "./CheckoutCartButton";

import GuestCheckoutCartButton from "./GuestCheckoutCartButton";
import GuestCartItem from "./GuestCartItem";

import LoggedInCartItem from "./LoggedInCartItem";

const Cart = () => {
  const { user } = useSelector(state => state.auth);
  const guestCart = useSelector(state => state.cart.items)
  const { data: loggedInCart, isLoading, error } = useGetUsersCartQuery();

  const navigate = useNavigate();

  return (
    <>
      <Paper elevation={6}>
        <Typography variant="h3" sx={{ marginLeft: 14 }} >Welcome to {user ? `${user.name}'s` : "Your"} Cart</Typography>
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
            !user && <Typography variant="h3" sx={{ padding: 10 }}>
              Your cart is empty
            </Typography>
          )}
        </Grid>
        <Typography sx={{ padding: 3, marginLeft: 4 }}>
          Click here to<Button onClick={() => { navigate('/') }}>continue shopping</Button>
        </Typography>
        {user && <CheckoutCartButton cartId={loggedInCart?.id} />}
        {!user && <GuestCheckoutCartButton />}
      </Paper>
    </>
  );
};

export default Cart;
