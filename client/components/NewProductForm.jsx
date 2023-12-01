import React from "react";

//import useState from react
import { useState } from "react";

import { useCreateCatProductMutation } from "../redux/api";

import { Stack, Button, Paper, TextField, Typography } from "@mui/material";


const NewProductForm = () => {

    const [createCatProduct, { isLoading: isLoadingProductForm }] = useCreateCatProductMutation();

   
    const [productName, setProductName] = useState("");
    const [detail, setDetail] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("")

    if (isLoadingProductForm) {
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
        console.log({  name: productName, detail, imageUrl, price, category });

        if (!error) {
            createCatProduct({ name: productName, detail, imageUrl, price, category })
        }
    }

    return (
        <Paper elevation={6} sx={{ padding: 1, margin: "auto", marginTop: 2, width: "50%", justifyContent: "center", textAlign: "center" }} >
            <form className="form" method="post" onSubmit={handleSubmit}>
                <Typography variant="h5">Add New Product</Typography>
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
                    disabled={!!error}
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

export default NewProductForm;