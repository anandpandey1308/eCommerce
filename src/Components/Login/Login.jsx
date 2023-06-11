/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import * as Property from "./Property";
import { LOGIN_API_URL, SIGNUP_API_URL } from "../../utils";

function Login() {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  const loginUser = (email, password) => {
    const userData = {
      email: email,
      password: password,
    };
    axios
      .post(LOGIN_API_URL, userData)
      .then((response) => {
        console.log("User logged in successfully!", response);
      })
      .catch((error) => {
        console.error("Login failed!", error);
      });
  };
  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    loginUser(email, password);
  };

  const signUp = (email, password, name, number, event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const userData = {
      email: email,
      password: password,
      name: name,
      phoneNumber: number,
    };
    axios
      .post(SIGNUP_API_URL, userData)
      .then((response) => {
        console.log("User signed up successfully!", response);
      })
      .catch((error) => {
        console.error("Sign up failed!", error);
      });
  };
  return (
    <Property.Container>
      <Property.SignUpContainer signinIn={signIn}>
        <Property.Form
          onSubmit={(e) => signUp(email, password, name, number, e)}
        >
          <Property.Title>Create Account</Property.Title>
          <Property.Input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Property.Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Property.Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Property.Input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => setNumber(e.target.value)}
          />
          <Property.Button type="submit">Sign Up</Property.Button>
        </Property.Form>
      </Property.SignUpContainer>

      <Property.SignInContainer signinIn={signIn}>
        <Property.Form onSubmit={handleLogin}>
          <Property.Title>Sign in</Property.Title>
          <Property.Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Property.Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Property.Anchor href="#">Forgot your password?</Property.Anchor>
          <Property.Button type="submit">Sign In</Property.Button>
        </Property.Form>
      </Property.SignInContainer>

      <Property.OverlayContainer signinIn={signIn}>
        <Property.Overlay signinIn={signIn}>
          <Property.LeftOverlayPanel signinIn={signIn}>
            <Property.Title>Welcome Back!</Property.Title>
            <Property.Paragraph>
              To keep connected with us, please login with your personal info.
            </Property.Paragraph>
            <Property.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Property.GhostButton>
          </Property.LeftOverlayPanel>

          <Property.RightOverlayPanel signinIn={signIn}>
            <Property.Title>Hello, Friend!</Property.Title>
            <Property.Paragraph>
              Enter your personal details and start the journey with us.
            </Property.Paragraph>
            <Property.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Property.GhostButton>
          </Property.RightOverlayPanel>
        </Property.Overlay>
      </Property.OverlayContainer>
    </Property.Container>
  );
}

export default Login;
