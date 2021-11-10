import React, { useState, useContext } from "react";
import { AppContext } from "../../store/app-context";
import { AuthContext } from "../../store/auth";
import { addDocument } from "../../firebase/services";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddRoomModal() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { showAddRoomModal, hideAddRoomModalHandler } =
        useContext(AppContext);
    const {
        user: { uid },
    } = useContext(AuthContext);

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    };

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!name || !description) {
            return;
        }
        addDocument("rooms", {
            name,
            description,
            members: [uid],
        });
        hideAddRoomModalHandler();
    };

    return (
        <Modal
            open={showAddRoomModal}
            onClose={hideAddRoomModalHandler}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                component="form"
                sx={{
                    backgroundColor: "rgba(255, 255, 255)",
                    display: "flex",
                    flexDirection: "column",
                    width: "40%",
                    padding: "16px",
                    borderRadius: "5px",
                }}
                onSubmit={formSubmitHandler}
            >
                <Typography component="h2" variant="h4">
                    Add Group
                </Typography>
                <TextField
                    id="name"
                    label="Name"
                    value={name}
                    onChange={nameChangeHandler}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="description"
                    label="Description"
                    value={description}
                    onChange={descriptionChangeHandler}
                    variant="outlined"
                    fullWidth
                    multiline
                    margin="normal"
                    rows={3}
                />
                <Button type="submit">Create</Button>
            </Box>
        </Modal>
    );
}

export default AddRoomModal;
