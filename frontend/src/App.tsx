import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Room from "./pages/room/Room";
import Home from "./pages/home/Home";
import { roomSlice } from "./store/reducers/RoomSlice";
import { useAppDispatch } from "./hooks/hooks";
import {
  UPDATE_USERS,
  socket,
  CHANGE_SCRAM_POINT_VISIBILITY,
} from "./API/socket";
import { IUser } from "./types/types";

function App() {
  const { initialize, changeScramPointVisibility } = roomSlice.actions;

  const dispatch = useAppDispatch();
  socket.on(UPDATE_USERS, (users: IUser[]) => {
    dispatch(initialize(users));
  });

  socket.on(CHANGE_SCRAM_POINT_VISIBILITY, (isVisible: boolean) => {
    dispatch(changeScramPointVisibility(isVisible));
  });

  return (
    <>
      <Routes>
        <Route path="/room" element={<Room />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
