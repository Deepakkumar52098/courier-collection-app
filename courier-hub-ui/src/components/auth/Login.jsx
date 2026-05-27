/* eslint-disable react-hooks/set-state-in-effect */
import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleButtonClick = () => {
    //invoke login api
    // dispatch(fetchLogin({
    //     method: API_CONSTANTS.LOGIN,
    //     body: {
    //         emailId,
    //         password
    //     }
    // }))
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <InputLabel sx={{ textAlign: "left" }}>EmailId</InputLabel>
        <TextField
          sx={{ width: "75%" }}
          type="text"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          id="outlined-basic"
          variant="outlined"
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <InputLabel sx={{ textAlign: "left" }}>Password</InputLabel>
        <TextField
          sx={{ width: "75%" }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-basic"
          variant="outlined"
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleButtonClick}
          sx={{ bgcolor: "#1976d2", margin: "10px", color: "#FFF" }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
