/* eslint-disable react-hooks/set-state-in-effect */
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { fetchLogin } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { API_CONSTANTS } from "../../api/API_CONSTANTS";

const Login = () => {
  const [emailId, setEmailId] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(
      fetchLogin({
        method: API_CONSTANTS.LOGIN_API,
        body: {
          emailId,
          password,
        },
      }),
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "#FFF",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>LOGIN</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", margin: "16px" }}>
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
      <Box sx={{ display: "flex", flexDirection: "column", margin: "16px" }}>
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
          sx={{
            bgcolor: "#1976d2",
            margin: "10px",
            color: "#FFF",
            fontWeight: 600,
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
