import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Room from "../pages/room/Room";
import Home from "../pages/home/Home";
import { roomSlice } from "../store/reducers/RoomSlice";
import { useAppDispatch } from "../hooks/hooks";
import {
  socket,
  CHANGE_SCRAM_POINT_VISIBILITY,
  RECONNECT,
  HOST_ROOM,
  CONNECT_ROOM,
  UPDATE_SCRAM_POINT,
  UPDATE_USER_ID,
  CLEAR_VOTES_VALUE,
} from "../API/socket";
import { IRoom, IUser } from "../types/types";
import Connect from "../pages/connect/Connect";
import { userSlice } from "../store/reducers/UserSlice";

function Index() {
  const { roomUpdate, changeScramPointVisibility } = roomSlice.actions;
  const { updateUserId, updateUserInfoFromLocalStorage, reconnect } =
    userSlice.actions;
  const dispatch = useAppDispatch();

  socket.on(HOST_ROOM, (room: IRoom) => {
    const { users } = room;

    dispatch(roomUpdate(users));
  });

  socket.on(CONNECT_ROOM, (users: IUser[]) => {
    dispatch(roomUpdate(users));
  });

  socket.on(CLEAR_VOTES_VALUE, (users: IUser[]) => {
    dispatch(roomUpdate(users));
  });

  socket.on(UPDATE_SCRAM_POINT, (users: IUser[]) => {
    dispatch(roomUpdate(users));
  });

  socket.on(RECONNECT, (users: IUser[]) => {
    dispatch(roomUpdate(users));
  });

  socket.on(UPDATE_USER_ID, (id: number) => {
    id && dispatch(updateUserId(id));
  });

  socket.on(CHANGE_SCRAM_POINT_VISIBILITY, (isVisible: boolean) => {
    dispatch(changeScramPointVisibility(isVisible));
  });

  let id;
  const raw = window.localStorage.getItem("user");
  const user = raw && (JSON.parse(raw) as IUser);

  if (user && user.userId && user.roomId) {
    id = user.userId;
    const { userId, roomId, name } = user;
    userId && dispatch(updateUserInfoFromLocalStorage({ ...user }));
    userId &&
      dispatch(reconnect({ name: name, userId: userId, roomId: roomId }));
  }

  const isReconnect = !!id;

  return (
    <>
      <Routes>
        <Route path="/room" element={<Room />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/room/:roomId"
          element={isReconnect ? <Room /> : <Connect />}
        />
      </Routes>
    </>
  );
}

export default Index;
