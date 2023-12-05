import React from "react";

//import useState from react
import { useState } from "react";

import { useCreateCatProductMutation } from "../redux/api";

import { Stack, Button, Paper, TextField, Typography, MenuItem, Snackbar, IconButton, Alert, AlertTitle } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const NewProductForm = () => {

    const [createCatProduct, { isLoading: isLoadingProductForm }] = useCreateCatProductMutation();


    const [productName, setProductName] = useState("");
    const [detail, setDetail] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("")

    // snack bar message
    const [open, setOpen] = useState(false);

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
        console.log({ name: productName, detail, imageUrl, price, category });

        if (!error) {
            createCatProduct({ name: productName, detail, imageUrl, price, category })
            setOpen(true)
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    // for the snack bar box
    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    ) 
    const categories = [
        {
            value: 'Food',
            label: 'Food',
        },
        {
            value: 'Treat',
            label: 'Treat',
        },
        {
            value: 'Toys',
            label: 'Toys',
        },
        {
            value: 'Accessories',
            label: 'Accessories',
        },
    ];

    return (
        <Paper elevation={6} sx={{ padding: 1, marginTop: 2, textAlign: "center", width: "100%", minWidth: 300 }} >
            <form className="form" method="post" onSubmit={handleSubmit}>
                <Typography variant="h4">Add New Product</Typography>
                {error && <p>{error}</p>}
                <Stack direction="column" >
                    <TextField
                        label="Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        sx={{ margin: "8px 0" }}
                        inputProps={{ style: { textTransform: 'capitalize' } }}
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
                        select
                    >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
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
                    sx={{ margin: "8px 0", justifyContent: "center", width: "50%", "&:hover": { bgcolor: "magenta", color: "white" } }}
                    variant="contained"
                    size="large"
                >
                    Reset
                </Button>
                <Button
                    disabled={!!error}
                    type="submit"
                    sx={{ margin: "8px 0", justifyContent: "center", width: "50%", "&:hover": { bgcolor: "magenta", color: "white" } }}
                    variant="contained"
                    size="large"
                >
                    Submit
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}
                >
                    <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    <AlertTitle>Success</AlertTitle>
                        Product Created!
                    </Alert>
                </Snackbar>
            </form>
        </Paper>
    )
}

export default NewProductForm;