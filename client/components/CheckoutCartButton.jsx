
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { useCheckoutCartMutation } from '../redux/api';

import  Typography  from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const CheckoutCartButton = ({ cartId }) => {
    const token = useSelector(state => state.auth.token);

    const [checkoutCart, { data }] = useCheckoutCartMutation();

    const onCheckout = async () => {
        await checkoutCart(cartId);
    }
    console.log(data)
    if (data) {
        return( 
            <Typography sx={{ textAlign: "center", margin: "auto"}}>
                Thank you for shopping at Whisker World! You have successfully checkedout!
            </Typography>
        // <ul>
        //     <li><Typography>{data.product.name}</Typography></li>
        //     <li><Typography>{data.product.price}</Typography></li>
        //     <li><Typography>{data.quantity}</Typography></li>
        // </ul>
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