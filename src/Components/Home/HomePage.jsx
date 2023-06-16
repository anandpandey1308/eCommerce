import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { GET_PROFILE_URL } from "../../utils";
import AppBarComponent from "../AppBar/AppBar";

function HomePage() {
  const handleProfile = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    axios
        .get(GET_PROFILE_URL, { headers: { "Authorization": `Bearer ${token}` } })
        .then((response) => {
            console.log("Profile", response);
        })
        .catch((error) => {
            console.error("Profile", error);
        });
};
  return (
    <div>
      <AppBarComponent/>
      <h1>Welcome to the Home Page!</h1>
      <p>This is the content of the home page.</p>
      <Button onClick={(e)=>handleProfile(e)}>CLick Me</Button>
    </div>
  );
}

export default HomePage;
