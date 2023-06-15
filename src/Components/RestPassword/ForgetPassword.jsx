import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography, Container } from "@material-ui/core";
import axios from "axios";
import AlertModal from "../AlertModal/AlertModal";
import { FORGET_PASS_API_URL } from "../../utils";
import { useNavigate } from "react-router-dom";

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
}));

function ForgetPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const forget = (email, e) => {
    e.preventDefault();
    const requestBody = {
      email: email,
    };

    axios
      .post(FORGET_PASS_API_URL, requestBody)
      .then((response) => {
        setOpenModal(true);
        setMessage(response.data.message);
        const resetToken = response.data.resetToken;
        navigate("/resetPassword", { state: { token: resetToken } });
      })
      .catch((error) => {
        console.error("Password reset failed!", error);
      });
  };

  const handleModalButtonClick = () => {
    setOpenModal(false);
    navigate("/resetPassword");
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
        <div>
          <Typography component="h1" variant="h5">
            Forget Password
          </Typography>
          <form className={classes.form} onSubmit={(e) => forget(email, e)}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default ForgetPassword;
