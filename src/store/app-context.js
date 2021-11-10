import React, { useState, useContext, useMemo } from "react";
import { AuthContext } from "./auth";
import useFirestore from "../hooks/useFirestore";

export const AppContext = React.createContext({
    showAddRoomModal: false,
    rooms: [],
    members: [],
    currentRoom: {},
});

export default function AppContextProvider(props) {
    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState("");

    const {
        user: { uid },
    } = useContext(AuthContext);

    // roomsCondition is object (reference type) useMemo for unnecessary render
    const roomsCondition = useMemo(() => {
        return {
            fieldPath: "members",
            operator: "array-contains",
            value: uid,
            sortBy: "desc",
        };
    }, [uid]);

    const rooms = useFirestore("rooms", roomsCondition);

    const currentRoom = useMemo(() => {
        return (
            rooms.find((room) => room.id === selectedRoomId) || {
                members: ["undefined"],
            }
        );
    }, [rooms, selectedRoomId]);

    const membersCondition = useMemo(() => {
        return {
            fieldPath: "uid",
            operator: "in",
            value: currentRoom.members,
            sortBy: "desc",
        };
    }, [currentRoom.members]);

    const members = useFirestore("users", membersCondition);

    const showAddRoomModalHandler = () => {
        setShowAddRoomModal(true);
    };

    const hideAddRoomModalHandler = () => {
        setShowAddRoomModal(false);
    };

    const showInviteMemberModalHandler = () => {
        setShowInviteMemberModal(true);
    };

    const hideInviteMemberModalHandler = () => {
        setShowInviteMemberModal(false);
    };

    const selectRoomHandler = (roomId) => {
        setSelectedRoomId(roomId);
    };

    const removeSelectedRoomHandler = () => {
        setSelectedRoomId(null);
    };

    return (
        <AppContext.Provider
            value={{
                rooms,
                members,
                selectedRoomId,
                currentRoom,
                showAddRoomModal,
                showInviteMemberModal,
                showAddRoomModalHandler,
                hideAddRoomModalHandler,
                showInviteMemberModalHandler,
                hideInviteMemberModalHandler,
                selectRoomHandler,
                removeSelectedRoomHandler,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}
