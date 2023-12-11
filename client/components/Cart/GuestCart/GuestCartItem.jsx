import { Typography, Paper, Button, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";

import React from "react"
import { incrementQuantity, decrementQuantity, removeItem } from '../../../redux/cartSlice'
import { useDispatch } from "react-redux";

const GuestCartItem = ({ id, imageUrl, name, price, quantity }) => {
    const dispatch = useDispatch();

    return (
        <Paper elevation={6} sx={{ marginLeft: 4 }}>
            <Card sx={{ maxWidth: 350, minWidth: 350, maxHeight: 450, minHeight: 450 }} >
                <CardMedia
                    component="img"
                    alt={name}
                    height="250"
                    image={imageUrl}
                    sx={{ objectFit: "contain" }}
                />
                <CardContent>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>{name}</Typography>
                    <Typography sx={{ textAlign: "center" }}><b>Price:</b>${price}</Typography>
                    <Typography sx={{ textAlign: "center" }}><b>Quantity:</b>{quantity}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "black" }, fontWeight: "bold" }} onClick={() => dispatch(removeItem(id))} > Remove Item </Button>
                    <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "black" }, fontWeight: "bold" }} onClick={() => dispatch(decrementQuantity(id))} disabled={quantity === 1}> - </Button>
                    <Button variant="contained" sx={{ "&:hover": { bgcolor: "magenta", color: "black" }, fontWeight: "bold" }} onClick={() => dispatch(incrementQuantity(id))} > + </Button>
                </CardActions>
            </Card>
        </Paper>
    )
}

export default GuestCartItem