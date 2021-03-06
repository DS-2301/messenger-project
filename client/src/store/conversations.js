import {
  addNewConvoToStore,
  addOnlineUserToStore,
  addSearchedUsersToStore,
  removeOfflineUserFromStore,
  addMessageToStore,
  setMessagesStatus,
  incrementUnreadMessagesInStore,
  readUnreadMessages,
  addLatestReadMessageToStore,
  addLatestReadMessageForAllConversationsToStore,
  getConvos,
} from "./utils/reducerFunctions";

// ACTIONS

const GET_CONVERSATIONS = "GET_CONVERSATIONS";
const SET_MESSAGE = "SET_MESSAGE";
const ADD_ONLINE_USER = "ADD_ONLINE_USER";
const REMOVE_OFFLINE_USER = "REMOVE_OFFLINE_USER";
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";
const ADD_CONVERSATION = "ADD_CONVERSATION";
const SET_HAS_BEEN_SEEN_STATUS = "SET_HAS_BEEN_SEEN_STATUS";
const INCREMENT_UNREAD_MESSAGES = "INCREMENT_UNREAD_MESSAGES";
const READ_ALL_MESSAGES = "READ_ALL_MESSAGES";
const SET_LATEST_READ_MESSAGE = "SET_LATEST_READ_MESSAGE";
const SET_LATEST_READ_MESSAGE_FOR_ALL_CONVERSATIONS =
  "SET_LATEST_READ_MESSAGE_FOR_ALL_CONVERSATIONS";

// ACTION CREATORS

export const gotConversations = (conversations, userId) => {
  return {
    type: GET_CONVERSATIONS,
    payload: { conversations, userId },
  };
};

export const setNewMessage = (message, sender) => {
  return {
    type: SET_MESSAGE,
    payload: { message, sender: sender || null },
  };
};

export const addOnlineUser = (id) => {
  return {
    type: ADD_ONLINE_USER,
    id,
  };
};

export const removeOfflineUser = (id) => {
  return {
    type: REMOVE_OFFLINE_USER,
    id,
  };
};

export const setSearchedUsers = (users) => {
  return {
    type: SET_SEARCHED_USERS,
    users,
  };
};

export const clearSearchedUsers = () => {
  return {
    type: CLEAR_SEARCHED_USERS,
  };
};

// add new conversation when sending a new message
export const addConversation = (recipientId, newMessage) => {
  return {
    type: ADD_CONVERSATION,
    payload: { recipientId, newMessage },
  };
};

export const setHasBeenSeenStatus = (msgIds, convoId) => {
  return {
    type: SET_HAS_BEEN_SEEN_STATUS,
    payload: { msgIds, convoId },
  };
};

export const incrementUnreadMessages = (convoId, message) => {
  return {
    type: INCREMENT_UNREAD_MESSAGES,
    payload: { convoId, message },
  };
};

export const readAllMessages = (convoId) => {
  return {
    type: READ_ALL_MESSAGES,
    convoId,
  };
};

export const setLatestReadMessage = (convoId, message) => {
  return {
    type: SET_LATEST_READ_MESSAGE,
    payload: { convoId, message },
  };
};

export const setLatestReadMessageForAllConversations = (userId) => {
  return {
    type: SET_LATEST_READ_MESSAGE_FOR_ALL_CONVERSATIONS,
    userId,
  };
};

// REDUCER

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return getConvos(action.payload.conversations, action.payload.userId);
    case SET_MESSAGE:
      return addMessageToStore(state, action.payload);
    case ADD_ONLINE_USER: {
      return addOnlineUserToStore(state, action.id);
    }
    case REMOVE_OFFLINE_USER: {
      return removeOfflineUserFromStore(state, action.id);
    }
    case SET_SEARCHED_USERS:
      return addSearchedUsersToStore(state, action.users);
    case CLEAR_SEARCHED_USERS:
      return state.filter((convo) => convo.id);
    case ADD_CONVERSATION:
      return addNewConvoToStore(
        state,
        action.payload.recipientId,
        action.payload.newMessage
      );
    case SET_HAS_BEEN_SEEN_STATUS:
      return setMessagesStatus(
        state,
        action.payload.msgIds,
        action.payload.convoId
      );
    case INCREMENT_UNREAD_MESSAGES:
      return incrementUnreadMessagesInStore(
        state,
        action.payload.convoId,
        action.payload.message
      );
    case READ_ALL_MESSAGES:
      return readUnreadMessages(state, action.convoId);
    case SET_LATEST_READ_MESSAGE:
      return addLatestReadMessageToStore(
        state,
        action.payload.convoId,
        action.payload.message
      );
    case SET_LATEST_READ_MESSAGE_FOR_ALL_CONVERSATIONS:
      return addLatestReadMessageForAllConversationsToStore(
        state,
        action.userId
      );
    default:
      return state;
  }
};

export default reducer;
