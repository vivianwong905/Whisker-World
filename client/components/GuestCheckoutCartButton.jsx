import { useSelector, useDispatch } from "react-redux";

import { clearCart, resetCart } from "../redux/cartSlice";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

import Stack from "@mui/material/Stack";

const GuestCheckoutCartButton = () => {
    const {items: guestCart, cartCheckedOut} = useSelector(state => state.cart)

    const dispatch = useDispatch();

    useEffect (() =>{// clean up function is when the componenet is unmounted 
        return () =>{
            dispatch(resetCart())
        }
    },[dispatch, resetCart])

    if (cartCheckedOut === true) {
        return (
            <Stack direction="row">
                <Typography sx={{ textAlign: "center", padding: 5, }} variant="h5">
                    Thank you for shopping at Whisker World! Your order will ship soon!
                </Typography>
            </Stack>
        )
    }

        return (
            <Button
                onClick={() => dispatch(clearCart())}
                variant="contained"
                sx={{ margin: 2, textAlign: "right", padding: 2 }}
            >
                Check Out
            </Button>
        )
    

    //this is not needed yet
    // return <Link href="#" component={RouterLink} to="/login">Log In to Check Out</Link>;
}

export default GuestCheckoutCartButton;