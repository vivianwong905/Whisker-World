import PropTypes from 'prop-types';

import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { useCheckoutCartMutation } from '../redux/api';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const CheckoutCartButton = ({ cartId }) => {
    const token = useSelector(state => state.token);

    const [checkoutCart] = useCheckoutCartMutation();

    const onCheckout = async () => {
        await checkoutCart(CartId);
    }

    if (token) {
        return (
            <Button
                onClick={onCheckout}
                variant="contained">
                Check Out
            </Button>
        )
    }

    return <Link href="#" component={RouterLink} to="/login">Log In to Check Out</Link>;
}


export default CheckoutCartButton;