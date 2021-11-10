import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserInfor from "./UserInfor";
import RoomList from "./RoomList";

function SideBar() {
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: "#3f0e40", height: "100%" }}>
            <Grid item xs={12}>
                <UserInfor />
            </Grid>
            <Grid item xs={12}>
                <RoomList />
            </Grid>
        </Box>
    );
}

export default SideBar;
