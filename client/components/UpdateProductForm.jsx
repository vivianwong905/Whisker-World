import React from "react";

//import useState from react
import { useState } from "react";

import { useUpdateCatProductMutation } from "../redux/api";
import { useLocation, useNavigate } from "react-router-dom" 

import { Stack, Button, Paper, TextField, Typography } from "@mui/material";


const UpdateProductForm = () => {

    const [updateCatProduct, { isLoading: isLoadingUpdatedProductForm }] = useUpdateCatProductMutation();
    
    const navigate = useNavigate();
    const location = useLocation();
    const {state} = location;

    //form state
    const [productName, setProductName] = useState((state && state.name) ?? "");
    const [detail, setDetail] = useState((state && state.detail)?? "");
    const [price, setPrice] = useState((state && state.price)?? "");
    const [imageUrl, setImageUrl] = useState((state && state.imageUrl)?? "");
    const [category, setCategory] = useState((state && state.category)?? "");
    const id= state && state.id ;

    const [error, setError] = useState("");

    if (isLoadingUpdatedProductForm) {
        return <Typography>Loading...</Typography>;
    }

    function resetForm() {
       
        setProductName("");
        setDetail("");
        setPrice("");
        setCategory("");
        setImageUrl("");
        setError("");
    }

    async function handleSubmit(e) {
        //prevent the browser from refreshing the page
        e.preventDefault();

        //read data directly from state
        console.log(id,{  name: productName, detail, imageUrl, price, category });

        if (!error) {
            updateCatProduct({productId: id, product: { name: productName, detail, imageUrl, price, category }})
            setTimeout(() => navigate('/'), 2000);
        }
    }

    return (
        <Paper elevation={6} sx={{ padding: 1, marginTop:5, marginLeft:10, width: "100%", justifyContent: "right", textAlign: "center", minWidth: 200 }} >
            <form className="form" method="post" onSubmit={handleSubmit}>
                <Typography variant="h5">Add Updated Product</Typography>
                {error && <p>{error}</p>}
                <Stack direction="column" >
                    <TextField
                        label="Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        sx={{ margin: "8px 0" }}
                        inputProps={{style: {textTransform: 'capitalize'}}}
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
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
                    disabled={error || state === null}
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