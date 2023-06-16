import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Grid,
  CircularProgress,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  LOGIN_OTP_API_URL, SIGNUP_API_URL } from "../../utils";
import useStyles from "./LoginStyles";

function LoginViaOTP() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [signIn, toggle] = useState(true);
  const [loginData, setLoginData] = useState({
    phoneNumber: "",
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUserViaOtp = async () => {
    try {
      const response = await axios.post(LOGIN_OTP_API_URL, loginData);
      if (response.data.success) {
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/verify-otp");
        }, 2000);
      } else {
        setError("Bad Credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  const handleLoginViaOtp = async (event) => {
    event.preventDefault();
    if (loginData.number === "") {
      setError("Please enter your Phone Number.");
      return;
    }
    setError("");
    setLoader(true);
    await loginUserViaOtp();
  };

  const signUp = (event) => {
    event.preventDefault();
    axios
      .post(SIGNUP_API_URL, loginData)
      .then((response) => {
        console.log("User signed up successfully!", response);
      })
      .catch((error) => {
        console.error("Sign up failed!", error);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {loader && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          className={classes.successSnackbar}
          message="Login Successful"
        />
      </Snackbar>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <div>
          <Typography component="h1" variant="h5">
            {signIn ? "Sign In" : "Create Account"}
          </Typography>
          <form
            className={classes.form}
            onSubmit={signIn ? handleLoginViaOtp : signUp}
          >
            {error && (
              <Typography variant="body2" className={classes.errorText}>
                {error}
              </Typography>
            )}
            {signIn ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Phone Number"
                    type="number"
                    name="phoneNumber"
                    value={loginData.phoneNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Link href="/" variant="body2">
                    Login Via Email?
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    disabled={loader}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Name"
                    name="name"
                    value={loginData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Phone Number"
                    name="number"
                    value={loginData.number}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            )}
          </form>
          <Grid container justify="center">
            <Grid item>
              <Button
                variant="text"
                color="primary"
                onClick={() => toggle(!signIn)}
              >
                {signIn
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}

export default LoginViaOTP;
