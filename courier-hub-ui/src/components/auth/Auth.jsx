/* eslint-disable react-hooks/set-state-in-effect */
import { Box, Link } from "@mui/material";
import Login from "./Login";
import TrackPackages from "../trackPackage/TrackPackages";
import { useState } from "react";

const Auth = () => {
  const [value, setValue] = useState("Login");

  const handleChange = (newValue) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          justifyContent: "end",
          margin: "16px",
        }}
      >
        <Link
          sx={{
            ":hover": { cursor: "pointer" },
            fontWeight: 600,
            fontSize: "20px",
          }}
          onClick={() => handleChange("Login")}
        >
          Login
        </Link>
        <Link
          sx={{
            ":hover": { cursor: "pointer" },
            fontWeight: 600,
            fontSize: "20px",
          }}
          onClick={() => handleChange("Track Courier")}
        >
          Track Courier
        </Link>
      </Box>
      {value === "Track Courier" ? (
        <Box
          sx={{
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: "5%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TrackPackages />
        </Box>
      ) : (
        <Box
          sx={{
            width: "20%",
            marginLeft: "40%",
            marginRight: "40%",
            marginTop: "10%",
            border: "1px solid #ccc",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "#fff",
          }}
        >
          <Box>
            <Login />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Auth;
