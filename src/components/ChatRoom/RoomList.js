import { useContext } from "react";
import { AppContext } from "../../store/app-context";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Button from "@mui/material/Button";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

function RoomList() {
    const { rooms, showAddRoomModalHandler, selectRoomHandler } =
        useContext(AppContext);

    return (
        <TreeView
            arial-label="Room List"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{
                height: 240,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
                padding: "16px 0",
                color: "#fff",
            }}
        >
            <TreeItem nodeId="1" label="Room List" sx={{ padding: "0 8px" }}>
                {rooms.map((room) => {
                    return (
                        <TreeItem
                            key={room.id}
                            nodeId={room.id}
                            label={room.name}
                            onClick={() => selectRoomHandler(room.id)}
                        />
                    );
                })}
            </TreeItem>
            <Button
                variant="outlined"
                startIcon={<AddBoxOutlinedIcon />}
                sx={{ margin: "16px", textTransform: "capitalize" }}
                onClick={showAddRoomModalHandler}
            >
                New room
            </Button>
        </TreeView>
    );
}

export default RoomList;
