
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { useCheckoutCartMutation } from '../redux/api';

import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const CheckoutCartButton = ({ cartId }) => {
    const token = useSelector(state => state.auth.token);

    const [checkoutCart, { data }] = useCheckoutCartMutation();

    const onCheckout = async () => {
        await checkoutCart(cartId);
    }

    if (data) {
        return (
            <Stack direction="row">
                <Typography sx={{ textAlign: "center", padding: 5,  }} variant="h5">
                    Thank you for shopping at Whisker World! Your order will ship soon!
                </Typography>
            </Stack>
        )
    }

    if (token) {
        return (
            <Button
                onClick={onCheckout}
                variant="contained"
                sx={{ margin: 2, textAlign: "right", padding: 2 }}
            >
                Check Out
            </Button>
        )
    }

    //this is not needed yet
    // return <Link href="#" component={RouterLink} to="/login">Log In to Check Out</Link>;
}


export default CheckoutCartButton;