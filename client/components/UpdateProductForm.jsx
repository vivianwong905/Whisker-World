import React from "react";

//import useState from react
import { useState } from "react";

import { useUpdateCatProductMutation } from "../redux/api";
import { useLocation, useNavigate } from "react-router-dom" 

import { Stack, Button, Paper, TextField, Typography } from "@mui/material";


const UpdateProductForm = () => {
    const navigate = useNavigate();
    const [updateCatProduct, { isLoading: isLoadingUpdatedProductForm }] = useUpdateCatProductMutation();
    const location = useLocation();
    const {state} = location
    const [productName, setProductName] = useState(state.name);
    const [detail, setDetail] = useState(state.detail);
    const [price, setPrice] = useState(state.price);
    const [imageUrl, setImageUrl] = useState(state.imageUrl);
    const [error, setError] = useState("")
    const id= state.id  
    if (isLoadingUpdatedProductForm) {
        return <Typography>Loading...</Typography>;
    }

    function resetForm() {
       
        setProductName("");
        setDetail("");
        setPrice("");
        setImageUrl("");
        setError("");
    }

    async function handleSubmit(e) {
        //prevent the browser from refreshing the page
        e.preventDefault();

        //read data directly from state
        console.log(id,{  name: productName, detail, imageUrl, price });

        if (!error) {
            updateCatProduct({productId: id, product: { name: productName, detail, imageUrl, price }})
            setTimeout(() => navigate('/'), 2000);
        }
    }

    return (
        <Paper elevation={6} sx={{ padding: 1, margin: "auto", width: "50%", justifyContent: "center", textAlign: "center" }} >
            <form className="form" method="post" onSubmit={handleSubmit}>
                <Typography variant="h5">Add Updated Product</Typography>
                {error && <p>{error}</p>}
                <Stack direction="column" >
                    <TextField
                        label="Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        sx={{ margin: "8px 0" }}
                    />
                    <TextField
                        label="Description"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        sx={{ margin: "8px 0" }}
                    />
                    <TextField
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        sx={{ margin: "8px 0" }}
                    />
                    <TextField
                        label="Image Url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        sx={{ margin: "8px 0" }}
                    />
                </Stack>
                <Button
                    type="reset"
                    onClick={resetForm}
                    sx={{ margin: "8px 0", justifyContent: "center", width: "50%" }}
                    variant="contained"
                    size="large"
                >
                    Reset
                </Button>
                <Button
                    disabled={error}
                    type="submit"
                    sx={{ margin: "8px 0", justifyContent: "center", width: "50%" }}
                    variant="contained"
                    size="large"
                >
                    Submit
                </Button>
            </form>
        </Paper>
    )
}

export default UpdateProductForm;