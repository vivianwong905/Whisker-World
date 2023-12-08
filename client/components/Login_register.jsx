import { useState } from "react";

import { Stack, Button, Paper, TextField, Typography, Link, Snackbar, IconButton, Alert, AlertTitle } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { useLoginMutation, useRegisterMutation } from '../redux/api'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAndItems } from "../redux/cartSlice";


const Login_register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [register, { isLoading } ] = useRegisterMutation();
    const [login] = useLoginMutation();
    const { items: cartItems } = useSelector(state => state.cart)
    const token = useSelector(state => state.auth.token);

    // form state
    const [type, setType] = useState("login");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    

    // snack bar message
    const [open, setOpen] = useState(false);

    // reset form
    function resetForm() {

    setFullName("");
    setUsername("");
    setPassword("");
    setRepeatPassword("");
    setError("");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (type === "register") {
                const {error}  = await register({ name: fullName, username, password, cartItems });
                if (error) {
                    setError(error.message)
                }
                //dispatch reset cart and items
                dispatch(resetCartAndItems())
                setOpen(true)
                // if(token){
                //     setTimeout(() => navigate('/'), 2000);
                // }
            }

            if (type === "login") {
                const {error} = await login({ username, password, cartItems });
                if (error) {
                    setError(error.message)
                }
                //dispatch reset cart and items
                dispatch(resetCartAndItems())
                setOpen(true)
                // if(token){
                //     setTimeout(() => navigate('/'), 2000);
                // }
            }
            {token && setTimeout(() => navigate('/'), 2000); }
        } catch (error) {
            console.error("Error:", error.message);
            // Handle errors as needed
        }

    }
    // for the snack bar
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

    return (
        <Paper elevation={6} sx={{ width: "50%", padding: 4, margin: "14px auto" }}>
            <form onSubmit={handleSubmit}>
                <Stack direction="column">
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "center" }}
                    >
                        {type === "login" ? "Log In" : "Register"}
                    </Typography>
                    {type === "register" && <TextField
                        label="Name"
                        onChange={e => setFullName(e.target.value)}
                        value={fullName}
                        sx={{ margin: "8px 0" }}
                        helperText = {fullName && fullName.length > 25 ? 'Character limit is 25': null }
                        error= {!!(fullName && fullName.length > 25)}
                        inputProps={{ maxLength: 26 }} 
                        />}
                    <TextField
                        label="Username"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        sx={{ margin: "8px 0" }} 
                        helperText = {username && username.length > 25 ? 'Character limit is 25': null }
                        error= {!!(username && username.length > 25)}
                        inputProps={{ maxLength: 26 }} 
                        />
                    <TextField
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        sx={{ margin: "8px 0" }}
                        type="password" 
                        helperText = {password && password.length > 25 ? 'Character limit is 25': null }
                        error= {!!(password && password.length > 25)}
                        inputProps={{ maxLength: 26 }} />

                    {type === "register" && <TextField
                        label="Re-Enter Password"
                        onChange={e => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                        type="password"
                        error={!!(password && repeatPassword && password !== repeatPassword)}
                        helperText={password && repeatPassword && password !== repeatPassword ? "Password must match" : null} />}
                </Stack>
                    {error ?  <Alert severity="error"> {error} </Alert> : null }
                <Button
                    variant="contained"
                    size="large"
                    sx={{ margin: "8px 0", width: "100%", "&:hover": { bgcolor: "magenta", color: "white" } }}
                    type="submit"
                    disabled={!!error}
                >
                    {type === "login" ? "Log In" : "Register"}
                </Button>
                {token && type === "login" &&
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        action={action}
                    >
                        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                            <AlertTitle>Success</AlertTitle>
                            Login Successful!
                        </Alert>
                    </Snackbar>
                }
                {token && type === "register" &&
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        action={action}
                    >
                        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                            <AlertTitle>Success</AlertTitle>
                            Registration successful!
                        </Alert>
                    </Snackbar>
                }
                 {!token && type === "register" &&
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        action={action}
                    >
                        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                            <AlertTitle>Error</AlertTitle>
                           <Typography>{error} </Typography>
                        </Alert>
                    </Snackbar>
                }
                {!token && type === "login" &&
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        action={action}
                    >
                        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                            <AlertTitle>Error</AlertTitle>
                           <Typography>{error} </Typography>
                        </Alert>
                    </Snackbar>
                }
                {type === "login"
                    ? (
                        <Typography>Need to create an account?{" "}
                            <Link href="#" onClick={() => {setType("register");resetForm()}}>
                                Register</Link>
                        </Typography>
                    ) : (
                        <Typography>Already have an account?{" "}
                            <Link href="#" onClick={() => {setType("login");resetForm()}}>
                                Log In</Link>
                        </Typography>
                    )}
                        <Button
                    type="reset"
                    onClick={resetForm}
                    sx={{ margin: "8px 0", justifyContent: "center", width: "10%", "&:hover": { bgcolor: "magenta", color: "white" } }}
                    variant="contained"
                    size="small"
                >
                    Reset
                </Button>
            </form>
        </Paper>
    );
}

export default Login_register;
