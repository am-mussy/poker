import { io } from "socket.io-client";

export const socket = io("http://89.223.64.140:4000", {
  transports: ["websocket"],
});

export const JOIN_TO_ROOM = "JOIN_TO_ROOM";
export const UPDATE_USERS = "UPDATE_USERS";
export const SET_SCRAM_POINT = "SET_SCRAM_POINT";
export const CHANGE_SCRAM_POINT_VISIBILITY = "CHANGE_SCRAM_POINT_VISIBILITY";
