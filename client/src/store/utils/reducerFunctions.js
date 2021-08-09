export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const setMessagesStatus = (state, msgIds, convoId) => {
  return state.map((convo) => {
    if (convo.id === convoId) {
      const newConvo = { ...convo };
      newConvo.messages = newConvo.messages.map((message) => {
        if (msgIds.includes(message.id)) {
          message.hasBeenSeen = true;
        }
        return message;
      });
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const getConvos = (conversations, userId) => {
  return conversations.map((convo) => {
    const newConvo = { ...convo };
    newConvo.unreadMessages =
      newConvo.messages &&
      newConvo.messages.filter(
        (message) => !message.hasBeenSeen && message.senderId !== userId
      );
    newConvo.unreadMessagesNum = newConvo.unreadMessages.length;
    return newConvo;
  });
};

export const incrementUnreadMessagesInStore = (state, convoId, message) => {
  return state.map((convo) => {
    if (convo.id === convoId) {
      const newConvo = { ...convo };
      newConvo.unreadMessagesNum += 1;
      newConvo.unreadMessages.push(message);
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const readUnreadMessages = (state, convoId) => {
  return state.map((convo) => {
    if (convo.id === convoId) {
      const newConvo = { ...convo };
      newConvo.unreadMessagesNum = 0;
      newConvo.unreadMessages = [];
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addLatestReadMessageToStore = (state, convoId, message) => {
  return state.map((convo) => {
    if (convo.id === convoId) {
      const newConvo = { ...convo };
      newConvo.latestSeenMessageId = message;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addLatestReadMessageForAllConversationsToStore = (
  state,
  userId
) => {
  return state.map((convo) => {
    const newConvo = { ...convo };
    if (newConvo.messages) {
      const filteredMessages = newConvo.messages.filter((message) => {
        return message.hasBeenSeen === true && message.senderId === userId;
      });
      newConvo.latestSeenMessageId =
        filteredMessages.length > 0 &&
        filteredMessages[filteredMessages.length - 1].id;
    }
    return newConvo;
  });
};
