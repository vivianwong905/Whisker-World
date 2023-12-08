
import { useSelector } from "react-redux";

import { useCheckoutCartMutation } from '../redux/api';

import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
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
                <Typography sx={{ textAlign: "left", padding: 7, }} variant="h5">
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
                sx={{ margin: 2, textAlign: "right", padding: 2, "&:hover": { bgcolor: "magenta", color: "white" } }}
            >
                Check Out
            </Button>
        )
    }


}


export default CheckoutCartButton;