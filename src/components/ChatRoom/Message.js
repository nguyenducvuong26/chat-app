import { useContext } from "react";
import { AuthContext } from "../../store/auth";
import classes from "./Message.module.css";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { formatRelative } from "date-fns";

function formatDate(seconds) {
    let formattedDate = "";
    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());
        formattedDate =
            formattedDate.charAt(0).toLocaleUpperCase() +
            formattedDate.slice(1);
    }
    return formattedDate;
}

function Message({ text, displayName, createdAt, photoURL, messageUid }) {
    const {
        user: { uid },
    } = useContext(AuthContext);

    return (
        <div className={classes.wrapper}>
            {uid === messageUid ? null : (
                <div className={classes.username}>
                    <Typography component="p">{displayName}</Typography>
                </div>
            )}

            <div
                className={`${classes.infor} ${
                    uid === messageUid ? classes["current-user-message"] : ""
                }`}
            >
                <div>
                    <Avatar
                        alt={displayName}
                        src={photoURL}
                        className={` ${
                            uid === messageUid
                                ? classes["current-user-avatar"]
                                : ""
                        }`}
                    >
                        {photoURL ? "" : displayName[0].toUpperCase()}
                    </Avatar>
                </div>
                <Tooltip title={formatDate(createdAt?.seconds)}>
                    <div className={classes.message}>
                        <Typography variant="p">{text}</Typography>
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}

export default Message;
