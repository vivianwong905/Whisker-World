import React from "react";

//import useState from react
import { useState } from "react";

import { useCreateCatProductMutation } from "../redux/api";

import { Stack, Button, Paper, TextField, Typography, MenuItem, Snackbar, IconButton, Alert, AlertTitle, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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

    const [openDialog, setDialogOpen] = useState(false)

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

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
        // console.log({ name: productName, detail, imageUrl, price, category });

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
        <>
            <Button variant="contained" sx={{padding: 2}}onClick={handleDialogClickOpen}>
                Create New Product
            </Button>
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <DialogTitle variant="h4">Add New Product</DialogTitle>
                    {error && <p>{error}</p>}
                    <DialogContent>
                        <Stack direction="column" >
                            <TextField
                                label="Name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                sx={{ margin: "8px 0" }}
                                inputProps={{ maxLength: 41, style: { textTransform: 'capitalize' } }}
                                helperText={
                                    productName && productName.length > 40
                                        ? <Alert severity="error"> Your product name is too long </Alert>
                                        : null
                                }
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
                    </DialogContent>
                    <DialogActions>
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
                            disabled={error || !productName || !price || !detail || !imageUrl || !category}
                            type="submit"
                            sx={{ margin: "8px 0", justifyContent: "center", width: "50%", "&:hover": { bgcolor: "magenta", color: "white" } }}
                            variant="contained"
                            size="large"
                            onClick={handleDialogClose}
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
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default NewProductForm;