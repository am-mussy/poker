/* eslint-disable-line */
import { io } from "socket.io-client";

export const socket = io("https://planning-time.ru/", {
  transports: ["websocket"],
});

// export const socket = io("http://127.0.0.1:4000/", {
//   transports: ["websocket"],
// });

export const CLEAR_VOTES_VALUE = "CLEAR_VOTES_VALUE";

export const SET_SCRAM_POINT = "SET_SCRAM_POINT";
export const CHANGE_SCRAM_POINT_VISIBILITY = "CHANGE_SCRAM_POINT_VISIBILITY";
export const RECONNECT = "RECONNECT";

export const HOST_ROOM = "HOST_ROOM";
export const CONNECT_ROOM = "CONNECT_ROOM";
export const UPDATE_SCRAM_POINT = "UPDATE_SCRAM_POINT";
export const UPDATE_USER_ID = "UPDATE_USER_ID";
export const REMOVE_USER = "REMOVE_USER";
