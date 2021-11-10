import React, { useState, useContext, useEffect, useCallback } from "react";
import classes from "./InviteMemberModal.module.css";
import { AppContext } from "../../store/app-context";
import {
    collection,
    getDocs,
    where,
    query,
    orderBy,
    limit,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Avatar, TextField } from "@mui/material";

function InviteMemberModal() {
    const {
        selectedRoomId,
        currentRoom,
        showInviteMemberModal,
        hideInviteMemberModalHandler,
    } = useContext(AppContext);
    const [keyword, setKeyword] = useState("");
    const [userList, setUserList] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    const keywordChangeHandler = (e) => {
        setKeyword(e.target.value);
    };

    const inputCheckHandler = (id) => {
        setSelectedUserIds((prev) => {
            const isChecked = selectedUserIds.includes(id);
            if (isChecked) {
                return selectedUserIds.filter((userId) => userId !== id);
            }
            return [...prev, id];
        });
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const roomRef = doc(db, "rooms", selectedRoomId);
        await updateDoc(roomRef, "members", [
            ...currentRoom.members,
            ...selectedUserIds,
        ]);
        setKeyword("");
        hideInviteMemberModalHandler();
    };

    const fetchUserList = useCallback(async (keyword, currentMembers) => {
        const q = query(
            collection(db, "users"),
            where("keywords", "array-contains", keyword),
            orderBy("displayName"),
            limit(20)
        );
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs
            .map((doc) => {
                return {
                    displayName: doc.data().displayName,
                    uid: doc.data().uid,
                    photoURL: doc.data().photoURL,
                };
            })
            .filter((user) => !currentMembers.includes(user.uid));
        return users;
    }, []);

    useEffect(() => {
        const debounce = setTimeout(async () => {
            const users = await fetchUserList(keyword, currentRoom.members);
            setUserList(users);
        }, 500);
        return () => {
            clearTimeout(debounce);
        };
    }, [keyword, currentRoom.members, fetchUserList]);

    return (
        <Modal
            open={showInviteMemberModal}
            onClose={hideInviteMemberModalHandler}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "rgba(255, 255, 255)",
                    display: "flex",
                    flexDirection: "column",
                    width: "40%",
                    padding: "16px",
                    borderRadius: "5px",
                    marginBottom: "20%",
                }}
            >
                <TextField
                    placeholder="Enter name..."
                    value={keyword}
                    label="Add member"
                    onChange={keywordChangeHandler}
                />
                <form className={classes.form} onSubmit={formSubmitHandler}>
                    {userList.length > 0 &&
                        userList.map((user) => {
                            return (
                                <div
                                    key={user.uid}
                                    className={classes["form-control"]}
                                >
                                    <div>
                                        <Avatar
                                            alt={user.displayName}
                                            src={user.photoURL}
                                        >
                                            {user.photoURL
                                                ? ""
                                                : user.displayName[0].toUpperCase()}
                                        </Avatar>
                                        <label>{user.displayName}</label>
                                    </div>
                                    <input
                                        type="checkbox"
                                        value={user.uid}
                                        checked={selectedUserIds.includes(
                                            user.uid
                                        )}
                                        onChange={() =>
                                            inputCheckHandler(user.uid)
                                        }
                                    />
                                </div>
                            );
                        })}
                    <Button fullWidth type="submit">
                        Add
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default InviteMemberModal;
