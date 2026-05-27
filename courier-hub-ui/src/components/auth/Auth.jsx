/* eslint-disable react-hooks/set-state-in-effect */
import { Box, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import TrackPackages from "../trackPackage/TrackPackages";
import { useState } from "react";

const Auth = () => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Box
            sx={{
                width: '20%',
                marginLeft: '40%',
                marginRight: '40%',
                marginTop: '10%',
                border: '1px solid #ccc',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: '#fff'
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                sx={{ bgcolor: '#1976d2' }}
            >
                <Tab
                    sx={{ color: '#fff', '&.Mui-selected': { color: '#fff', } }}
                    label="Track Packages" />
                <Tab
                    sx={{ color: '#fff', '&.Mui-selected': { color: '#fff', }, }}
                    label="Login" />
            </Tabs>

            <Box sx={{ p: 2 }}>
                {value ? <Login />: <TrackPackages/>}
            </Box>
        </Box>
    )
}

export default Auth;
