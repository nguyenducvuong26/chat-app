import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";
import AddRoomModal from "../Modals/AddRoomModal";
import InviteMemberModal from "../Modals/InviteMemberModal";

function ChatRoom() {
    return (
        <React.Fragment>
            <AddRoomModal />
            <InviteMemberModal />
            <Box sx={{ flexGrow: 1, height: "100vh" }}>
                <Grid container sx={{ height: "100%" }}>
                    <Grid item xs={3}>
                        <SideBar />
                    </Grid>
                    <Grid item xs={9}>
                        <ChatWindow />
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}

export default ChatRoom;
