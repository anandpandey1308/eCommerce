import React, { useState } from "react";
import {
  
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { VERIFY_OTP_API_URL } from "../../utils";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999,
  },
}));

function OtpVerification({ email, onSuccess }) {
  const classes = useStyles();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    if (otp.trim() === "") {
      setError("Please enter the OTP.");
      return;
    }
    setError("");
    setLoader(true);

    try {
      const response = await axios.post(VERIFY_OTP_API_URL, {
        email,
        otp,
      });

      if (response.data.success) {
        onSuccess(); // Invoke the success callback
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
      <Typography component="h1" variant="h5">
        OTP Verification
      </Typography>
      <form className={classes.form} onSubmit={handleVerifyOtp}>
        {error && (
          <Typography variant="body2" className={classes.errorText}>
            {error}
          </Typography>
        )}
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Verify OTP
        </Button>
        <Button variant="text" color="primary" onClick={()=>{navigate("/")}}>
          Cancel
        </Button>
      </form>
    </>
  );
}

export default OtpVerification;
