import React, { useMemo } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { readMessages } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  unreadIndicator: {
    borderRadius: "2em",
    border: "1px solid",
    padding: "0.5em 1em",
    fontSize: "0.7em",
    color: "white",
    backgroundColor: "#3A8DFF",
    fontWeight: 600,
    marginRight: "1em",
  },
};

const Chat = (props) => {
  const handleClick = async (username, unreadMessages, convoId) => {
    await props.readMessages(unreadMessages, username, convoId);
  };

  const { classes, userId } = props;
  const otherUser = props.conversation.otherUser;

  const unreadMessages = useMemo(
    () =>
      props.conversation.messages &&
      props.conversation.messages.filter(
        (message) => !message.hasBeenSeen && message.senderId !== userId
      ),
    [props.conversation, userId]
  );

  const unreadMessagesNum = useMemo(
    () => unreadMessages.length,
    [unreadMessages]
  );

  return (
    <Box
      onClick={() =>
        handleClick(otherUser.username, unreadMessages, props.conversation.id)
      }
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} />
      {unreadMessagesNum > 0 && (
        <span className={classes.unreadIndicator}>{unreadMessagesNum}</span>
      )}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    readMessages: (messages, username, convoId) => {
      dispatch(readMessages(messages, username, convoId));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
