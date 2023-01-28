/* eslint-disable-line */
import { io } from "socket.io-client";

export const socket = io("https://94.228.118.237:4000/", {
  transports: ["websocket"],
  rejectUnauthorized: false,
});
export const CLEAR_VOTES_VALUE = "CLEAR_VOTES_VALUE";
export const JOIN_TO_ROOM = "JOIN_TO_ROOM";
export const UPDATE_USERS = "UPDATE_USERS";
export const SET_SCRAM_POINT = "SET_SCRAM_POINT";
export const CHANGE_SCRAM_POINT_VISIBILITY = "CHANGE_SCRAM_POINT_VISIBILITY";
