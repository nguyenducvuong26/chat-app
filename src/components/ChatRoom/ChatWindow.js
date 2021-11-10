import React, { useState, useContext, useMemo } from "react";
import { AppContext } from "../../store/app-context";
import { AuthContext } from "../../store/auth";
import classes from "./ChatWindow.module.css";
import { addDocument } from "../../firebase/services";
import useFirestore from "../../hooks/useFirestore";
import Button from "@mui/material/Button";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Message from "./Message";
import Alert from "@mui/material/Alert";

function ChatWindow() {
    const [message, setMessage] = useState("");
    const {
        selectedRoomId,
        currentRoom,
        members,
        showInviteMemberModalHandler,
    } = useContext(AppContext);
    const { user } = useContext(AuthContext);

    const messagesCondition = useMemo(() => {
        return {
            fieldPath: "roomId",
            operator: "==",
            value: selectedRoomId,
            sortBy: "asc",
        };
    }, [selectedRoomId]);

    const messages = useFirestore("messages", messagesCondition);

    const inputChangeHandler = (e) => {
        setMessage(e.target.value);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        addDocument("messages", {
            message,
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            roomId: selectedRoomId,
        });
        setMessage("");
    };

    return (
        <React.Fragment>
            {selectedRoomId && (
                <div className={classes.wrapper}>
                    <header className={classes.header}>
                        <div className={classes.room}>
                            <p>{currentRoom?.name}</p>
                            <span>{currentRoom?.description}</span>
                        </div>
                        <div className={classes.actions}>
                            {selectedRoomId && (
                                <Button
                                    startIcon={<PersonAddOutlinedIcon />}
                                    variant="text"
                                    sx={{
                                        textTransform: "capitalize",
                                        marginRight: "12px",
                                    }}
                                    onClick={showInviteMemberModalHandler}
                                >
                                    Invite
                                </Button>
                            )}
                            <AvatarGroup max={3}>
                                {members.map((member) => {
                                    return (
                                        <Tooltip
                                            key={member.uid}
                                            title={member.displayName}
                                        >
                                            <Avatar
                                                alt={member.displayName}
                                                src={member?.photoURL}
                                            >
                                                {member.photoURL
                                                    ? ""
                                                    : member.displayName[0].toUpperCase()}
                                            </Avatar>
                                        </Tooltip>
                                    );
                                })}
                            </AvatarGroup>
                        </div>
                    </header>
                    <div className={classes.messages}>
                        {messages.map((message) => {
                            return (
                                <Message
                                    key={message.id}
                                    text={message.message}
                                    displayName={message.displayName}
                                    createdAt={message.createdAt}
                                    messageUid={message.uid}
                                />
                            );
                        })}
                    </div>
                    <div className={classes.input}>
                        <Box
                            component="form"
                            noValidate
                            sx={{ display: "flex" }}
                            onSubmit={formSubmitHandler}
                        >
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Send message..."
                                fullWidth
                                value={message}
                                onChange={inputChangeHandler}
                            />
                            <Button type="submit">Send</Button>
                        </Box>
                    </div>
                </div>
            )}
            {!selectedRoomId && (
                <Alert severity="info">Choose Room To Chat~~!!</Alert>
            )}
        </React.Fragment>
    );
}

export default ChatWindow;
