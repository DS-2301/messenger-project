import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import memorize from "./memorize"

const useStyles = makeStyles(() => ({
  messageContainer: {
    height: "55vh",
    overflowY: "auto",
    overflowAnchor: "revert",
    transform: "rotateX(180deg)",
  },
  scrollContainer: {
    transform: "rotateX(180deg)",
  },
}));

const fixMessagesOrder = (messages) => {
  return messages.reverse()
}

const rightOrderMessages= memorize(fixMessagesOrder)

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const classes = useStyles();
  return (
    
    <Box className={classes.messageContainer}>
      <Box className={classes.scrollContainer}>
        {rightOrderMessages(messages).map((message) => {
          const time = moment(message.createdAt).format("h:mm");
          return message.senderId === userId ? (
            <SenderBubble key={message.id} text={message.text} time={time} />
          ) : (
            <OtherUserBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Messages;
