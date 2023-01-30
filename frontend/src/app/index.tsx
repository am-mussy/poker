import React, { useEffect } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Room from "../pages/room/Room";
import Home from "../pages/home/Home";
import { roomSlice } from "../store/reducers/RoomSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  UPDATE_USERS,
  socket,
  CHANGE_SCRAM_POINT_VISIBILITY,
  RECONNECT,
} from "../API/socket";
import { IUser } from "../types/types";
import Connect from "../pages/connect/Connect";
import { userSlice } from "../store/reducers/UserSlice";

function Index() {
  const { initialize, changeScramPointVisibility } = roomSlice.actions;

  const dispatch = useAppDispatch();
  socket.on(UPDATE_USERS, (users: IUser[]) => {
    console.log({ users });
    dispatch(initialize(users));
  });

  socket.on(CHANGE_SCRAM_POINT_VISIBILITY, (isVisible: boolean) => {
    dispatch(changeScramPointVisibility(isVisible));
  });

  const { connect, reconnect } = userSlice.actions;

  useEffect(() => {
    socket.on(RECONNECT, ({ name, roomId }: IUser) => {
      name && roomId && dispatch(connect({ name: name, roomId: roomId }));
    });
  });

  const { roomId } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    const raw = window.localStorage.getItem("user");
    const user = raw && (JSON.parse(raw) as IUser);

    if (user && user.userId && user.roomId) {
      dispatch(reconnect({ userId: user.userId, roomId: user.roomId }));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/room" element={<Room />} />
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={roomId ? <Room /> : <Connect />} />
      </Routes>
    </>
  );
}

export default Index;
