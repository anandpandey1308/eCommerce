import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import AlertModal from "../AlertModal/AlertModal";
import { RESET_PASS_API_URL } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";

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

function ResetPassword() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location?.state?.token || "";
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (passwords.password.trim() === "" || passwords.confirmPassword.trim() === "") {
      setError("Please enter your new password and confirm password.");
      return;
    }
    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoader(true);
    try {
      const requestBody = {
        password: passwords.password,
        confirmPassword: passwords.confirmPassword,
      };
      const response = await axios.post(`${RESET_PASS_API_URL}/${token}`, requestBody);
      if (response) {
        setOpenModal(true);
        setMessage("Password reset successful.");
        navigate("/")
      } else {
        setError("Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  const handleModalButtonClick = () => {
    setOpenModal(false);
    navigate("/"); 
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
            Reset Password
          </Typography>
          <form className={classes.form} onSubmit={handleResetPassword}>
            {error && (
              <Typography variant="body2" className={classes.errorText}>
                {error}
              </Typography>
            )}
            <TextField
              variant="outlined"
              fullWidth
              label="New Password"
              type="password"
              name="password"
              value={passwords.password}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loader}
            >
              Reset Password
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default ResetPassword;
