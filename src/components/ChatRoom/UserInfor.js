import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { AuthContext } from "../../store/auth";
import { AppContext } from "../../store/app-context";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function UserInfor() {
    const { user } = useContext(AuthContext);
    const { removeSelectedRoomHandler } = useContext(AppContext);

    const signOutWithFacebookHandler = async () => {
        removeSelectedRoomHandler();
        try {
            signOut(auth);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                padding: "16px 0",
                borderBottom: "1px solid rgba(82,38,83)",
            }}
        >
            <Grid container>
                <Grid item xs={8}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "16px",
                        }}
                    >
                        <Avatar alt={user.displayName} src={user.photoURL}>
                            {user.photoURL
                                ? ""
                                : user.displayName[0].toUpperCase()}
                        </Avatar>
                        <Typography
                            variant="h6"
                            component="h3"
                            color="white"
                            sx={{ fontSize: "1rem", marginLeft: "8px" }}
                        >
                            {user.displayName}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ textAlign: "center" }}>
                        <Button
                            variant="outlined"
                            onClick={signOutWithFacebookHandler}
                        >
                            Log out
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default UserInfor;
