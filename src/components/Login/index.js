import React from "react";
import {
    signInWithPopup,
    FacebookAuthProvider,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { addDocument } from "../../firebase/services";
import { generateKeywords } from "../../firebase/services";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

function Login() {
    const LoginWithFaceBookHandler = async () => {
        const { _tokenResponse, user } = await signInWithPopup(
            auth,
            facebookProvider
        );
        if (_tokenResponse?.isNewUser) {
            addDocument("users", {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: _tokenResponse.providerId,
                keywords: generateKeywords(user.displayName),
            });
        }
    };

    const LoginWithGoogleHandler = async () => {
        const { _tokenResponse, user } = await signInWithPopup(
            auth,
            googleProvider
        );
        if (_tokenResponse?.isNewUser) {
            addDocument("users", {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: _tokenResponse.providerId,
                keywords: generateKeywords(user.displayName),
            });
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{ justifyContent: "center" }}>
                <Grid item xs={6} sx={{ textAlign: "center" }}>
                    <Typography component="h3" variant="h3" mt={2} mb={2}>
                        Chat App
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{ marginRight: "8px" }}
                        endIcon={<FacebookIcon />}
                        onClick={LoginWithFaceBookHandler}
                    >
                        Sign in with Facebook
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ marginLeft: "8px" }}
                        endIcon={<GoogleIcon />}
                        onClick={LoginWithGoogleHandler}
                    >
                        Sign in with Google
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;
