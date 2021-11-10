import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const AuthContext = React.createContext({
    displayName: "",
    email: "",
    uid: "",
    photoURL: "",
});

export default function AuthContextProvider(props) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                history.push("/");
            } else {
                history.push("/login");
            }
            setIsLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [history]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? (
                <Box sx={{ textAlign: "center" }}>
                    <CircularProgress />
                </Box>
            ) : (
                props.children
            )}
        </AuthContext.Provider>
    );
}
