import axios from "axios";
import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setHasBeenSeenStatus,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", async (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
    if (
      store.getState().activeConversation.id === data.message.conversationId
    ) {
      await axios.patch("api/messages", { ids: [data.message.id] });
      store.dispatch(
        setHasBeenSeenStatus([data.message], data.message.conversationId)
      );
    }
  });
});

export default socket;
