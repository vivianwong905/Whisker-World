import { useSelector, useDispatch } from "react-redux";


import { clearCart } from "../redux/cartSlice";

import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

import Stack from "@mui/material/Stack";

const GuestCheckoutCartButton = ({ cartId }) => {
    const guestCart = useSelector(state => state.cart.items)

    const dispatch = useDispatch();

   
  
    // if (guestCart?.length === 0) {
    //     return (
    //         <Stack direction="row">
    //             <Typography sx={{ textAlign: "center", padding: 5,  }} variant="h5">
    //                 Thank you for shopping at Whisker World! Your order will ship soon!
    //             </Typography>
    //         </Stack>
    //     )
    // }

    if (guestCart) {
        return (
            <Button
                onClick={() => dispatch(clearCart())}
                variant="contained"
                sx={{ margin: 2, textAlign: "right", padding: 2 }}
            >
                Check Out
            </Button>
        )
    } else if (guestCart?.length === 0) {
        return (
            <Stack direction="row">
                <Typography sx={{ textAlign: "center", padding: 5,  }} variant="h5">
                    Thank you for shopping at Whisker World! Your order will ship soon!
                </Typography>
            </Stack>
        )
    }

    //this is not needed yet
    // return <Link href="#" component={RouterLink} to="/login">Log In to Check Out</Link>;
}

export default GuestCheckoutCartButton;