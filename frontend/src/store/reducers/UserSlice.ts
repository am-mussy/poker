import { IUser } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SET_SCRAM_POINT,
  socket,
  RECONNECT,
  HOST_ROOM,
  CONNECT_ROOM,
} from "../../API/socket";

const initialState: IUser = {
  name: "",
  roomId: 0,
  scrum: 0,
  host: false,
  userId: null,
};

export const userSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    hostRoom(state, action: PayloadAction<IUser>) {
      state.name = action.payload.name;
      state.roomId = action.payload.roomId;
      state.host = action.payload.host;

      socket.emit(HOST_ROOM, state);
    },

    setScramPoint(state, action: PayloadAction<number>) {
      state.scrum = action.payload;
      socket.emit(SET_SCRAM_POINT, {
        roomId: state.roomId,
        userId: state.userId,
        scrumPoint: state.scrum,
      });
    },

    connect(state, action: PayloadAction<IUser>) {
      state.name = action.payload.name;
      state.roomId = action.payload.roomId;
      state.host = false;

      socket.emit(CONNECT_ROOM, state);
    },

    reconnect(state, action: PayloadAction<IUser>) {
      socket.emit(RECONNECT, {
        userId: action.payload.userId,
        roomId: action.payload.roomId,
      });
    },

    updateUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },

    updateUserInfoFromLocalStorage(state, action: PayloadAction<IUser>) {
      state.name = action.payload.name;
      state.roomId = action.payload.roomId;
      state.userId = action.payload.userId;
      state.host = action.payload.host;
      state.scrum = action.payload.scrum;
    },
  },
});

export default userSlice.reducer;
