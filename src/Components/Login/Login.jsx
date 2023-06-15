import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_API_URL, SIGNUP_API_URL } from "../../utils";
import AlertModal from "../AlertModal/AlertModal";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    position: "relative",
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
  },
}));

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [signIn, toggle] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    number: "",
    name: "",
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(LOGIN_API_URL, loginData);
      if (response) {
        setOpenModal(true);
        setMessage("Login Successful");
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

  const handleLogin = async (event) => {
    event.preventDefault();
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoader(true);
    await loginUser();
  };
  const signUp = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    axios
      .post(SIGNUP_API_URL, loginData)
      .then((response) => {
        console.log("User signed up successfully!", response);
      })
      .catch((error) => {
        console.error("Sign up failed!", error);
      });
  };

  const handleModalButtonClick = () => {
    setOpenModal(false);
    navigate("/home");
  };

  return (
    <>
      <AlertModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        message={message}
        onButtonClick={handleModalButtonClick}
      />
      <Container component="main" maxWidth="xs" className={classes.container}>
        {loader && <CircularProgress />}
        <div>
          <Typography component="h1" variant="h5">
            {signIn ? "Sign In" : "Create Account"}
          </Typography>
          <form
            className={classes.form}
            onSubmit={
              signIn
                ? handleLogin
                : signUp
            }
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
                  <Link href="/forgetPassword" variant="body2">
                    Forgot your password?
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

export default Login;
