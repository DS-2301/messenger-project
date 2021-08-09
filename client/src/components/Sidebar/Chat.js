import { Badge, Box } from "@material-ui/core";
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
    marginRight: "2em",
  },
};

const Chat = (props) => {
  const handleClick = async (
    username,
    unreadMessages,
    convoId,
    recipientId
  ) => {
    await props.readMessages(unreadMessages, username, convoId, recipientId);
  };

  const { classes } = props;
  const otherUser = props.conversation.otherUser;

  return (
    <Box
      onClick={() =>
        handleClick(
          otherUser.username,
          props.conversation.unreadMessages,
          props.conversation.id,
          otherUser.id
        )
      }
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      {props.conversation.unreadMessagesNum > 0 ? (
        <>
          <ChatContent conversation={props.conversation} unread={true} />
          <Badge
            color="primary"
            badgeContent={props.conversation.unreadMessagesNum}
            className={classes.unreadIndicator}
          />
        </>
      ) : (
        <ChatContent conversation={props.conversation} />
      )}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    readMessages: (messages, username, convoId, recipientId) => {
      dispatch(readMessages(messages, username, convoId, recipientId));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
