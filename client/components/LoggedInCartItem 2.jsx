import { Typography, Box, Button, Grid, Card, CardMedia, CardContent, CardActions, Stack, Link, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom"
import { useGetUsersCartQuery, useUpdateUsersCartMutation, useDeleteCartItemsInCartMutation } from "../redux/api";
import { useCheckoutCartMutation } from '../redux/api';

const LoggedInCartItem = () => {
    const { user } = useSelector(state => state.auth);
    const { data: loggedInCart, isLoading, error } = useGetUsersCartQuery();


    const [checkoutCart, { data: checkoutCartData }] = useCheckoutCartMutation();

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

    const onCheckout = async () => {
        await checkoutCart(loggedInCart.id);
    }


    if (user && isLoading) {
        return <Typography>Loading...</Typography>;
    }
    if (user && error) {
        return <Typography color="error">Error: {error.message}</Typography>;
    }

    return (
        <>
            <Box sx={{ marginLeft: 4, }}>
                <Grid container spacing={4} >
                    {user && loggedInCart?.cartItems?.length // this is to make sure that checking for null along the way - cart? and cartItems?
                        //any of these are undefined - then will display cart as empty
                        ? loggedInCart.cartItems.slice().sort((a, b) => a.product.name > b.product.name ? 1 : -1).map(cartItem => {
                            return (
                                <Grid item key={cartItem.id}>
                                    <Card sx={{ maxWidth: 350, minWidth: 350, maxHeight: 450, minHeight: 450, padding: 2 }} >
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
                                            <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "white" } }} onClick={() => deleteCartItemsInCart(cartItem.id)} > Remove Item </Button>
                                            <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "white" } }} onClick={() => handleDecrement(cartItem)} disabled={cartItem.quantity === 1}> - </Button>
                                            <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "white" } }} onClick={() => handleIncrement(cartItem)} > + </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>)
                        })
                        : (
                            user && !checkoutCartData &&
                            <Typography variant="h3" sx={{ marginLeft: 3.5, padding: 1 }} >
                                Your cart is empty
                            </Typography>
                        )}
                </Grid>
                {/* success order message */}
                {checkoutCartData && <Stack direction="row">
                    <Typography sx={{ padding: 1, marginTop: 2 }} variant="h5">
                        Thank you for shopping at Whisker World! Your order will ship soon!
                    </Typography>
                </Stack>}
                <Typography variant="h6" sx={{ padding: 3, marginLeft: 3.5 }}>
                    Click here to <Link href="#" component={RouterLink} to="/">continue shopping</Link>
                </Typography>
                {/* Logged in cart checkout button or disabled button if cart empty */}
                {user && loggedInCart.cartItems.length > 0 ? (<Button
                    onClick={onCheckout}
                    variant="contained"
                    sx={{ margin: 2, padding: 2, marginLeft: 5, "&:hover": { bgcolor: "magenta", color: "white" } }}
                >
                    Check Out
                </Button>)
                    : (user &&
                        <Tooltip title={<Typography>Add items to the cart to checkout</Typography>} placement="bottom-start" >
                            <div>
                                <Button disabled variant="contained" sx={{ margin: 2, padding: 2, marginLeft: 5, opacity: 0.5 }}>
                                    Checkout
                                </Button>
                            </div>
                        </Tooltip>
                    )}
            </Box>
        </>
    );
}

export default LoggedInCartItem;