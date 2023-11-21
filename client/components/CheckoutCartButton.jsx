
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { useCheckoutCartMutation } from '../redux/api';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const CheckoutCartButton = ({ cartId }) => {
    const token = useSelector(state => state.auth.token);

    const [checkoutCart] = useCheckoutCartMutation();

    const onCheckout = async () => {
        await checkoutCart(cartId);
    }

    if (token) {
        return (
            <Button
                onClick={onCheckout}
                variant="contained"
                sx={{ margin: 2, textAlign: "right", padding: 2}}
                >
                Check Out
            </Button>
        )
    }

    //this is not needed yet
    // return <Link href="#" component={RouterLink} to="/login">Log In to Check Out</Link>;
}


export default CheckoutCartButton;