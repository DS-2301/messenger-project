import axios from "axios";
import initSocket from "../../socket";
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
  setHasBeenSeenStatus,
  incrementUnreadMessages,
  readAllMessages,
  setLatestReadMessage,
  setLatestReadMessageForAllConversations,
} from "../conversations";
import { gotUser, setFetchingStatus } from "../user";
import { setActiveChat } from "../activeConversation";
import store from "..";

let socket = null;

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem("messenger-token");
  config.headers["x-access-token"] = token;

  return config;
});

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get("/auth/user");
    dispatch(gotUser(data));
    if (data.id) {
      socket = initSocket(data.id);
      socket.emit("go-online", data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/register", credentials);
    await localStorage.setItem("messenger-token", data.token);
    dispatch(gotUser(data));
    socket = initSocket(data.id);
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    await localStorage.setItem("messenger-token", data.token);
    dispatch(gotUser(data));
    socket = initSocket(data.id);
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete("/auth/logout");
    await localStorage.removeItem("messenger-token");
    dispatch(gotUser({}));
    socket.emit("logout", id);
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    dispatch(gotConversations(data, userId));
    dispatch(setLatestReadMessageForAllConversations(userId));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async (body) => {
  const { data } = await axios.post("/api/messages", body);
  return data;
};

const sendMessage = (data, body) => {
  socket.emit("new-message", {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender,
    convoWith: body.conversationWith,
  });
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch) => {
  try {
    const data = await saveMessage(body);
    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message));
    }
    sendMessage(data, body);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};

const setUpcomingMessagesToSeen = (messages, convoId, recipientId) => {
  socket.emit("read-message", {
    messages: messages,
    convoId: convoId,
    recipientId: recipientId,
  });
};

const saveReadMessages = async (ids) => {
  await axios.patch("/api/messages", { ids: ids });
};

export const readMessages =
  (messages, username, convoId, recipientId) => async (dispatch) => {
    try {
      if (messages && messages.length > 0) {
        const msgIds = messages.map((message) => message.id);
        await saveReadMessages(msgIds);
        dispatch(setHasBeenSeenStatus(msgIds, convoId));
        dispatch(readAllMessages(convoId));
        setUpcomingMessagesToSeen(msgIds, convoId, recipientId);
      }
      dispatch(setActiveChat(username));
    } catch (error) {
      console.error(error);
    }
  };

export const getUpcomingMessage = (data) => async (dispatch) => {
  dispatch(setNewMessage(data.message, data.sender));
  dispatch(incrementUnreadMessages(data.message.conversationId, data.message));
  if (store.getState().activeConversation === data.convoWith) {
    await axios.patch("api/messages", { ids: [data.message.id] });
    dispatch(readAllMessages(data.message.conversationId));
    dispatch(
      setHasBeenSeenStatus([data.message.id], data.message.conversationId)
    );
    setUpcomingMessagesToSeen(
      [data.message.id],
      data.message.conversationId,
      data.message.senderId
    );
  }
};

export const receiveLastSeenMessage = (data) => (dispatch) => {
  dispatch(setHasBeenSeenStatus(data.messages, data.convoId));
  dispatch(
    setLatestReadMessage(data.convoId, data.messages[data.messages.length - 1])
  );
};
