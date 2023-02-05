import { IUser } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SET_SCRAM_POINT,
  socket,
  RECONNECT,
  HOST_ROOM,
  CONNECT_ROOM,
  REMOVE_USER,
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
      if (!state.userId) {
        state.userId = action.payload;
        const raw = window.localStorage.getItem("user");
        const user = raw && (JSON.parse(raw) as IUser);

        window.localStorage.setItem(
          "user",
          JSON.stringify({ ...user, userId: state.userId })
        );
      }
    },

    updateRoomId(state, action: PayloadAction<number>) {
      state.roomId = action.payload;
    },

    updateUserInfoFromLocalStorage(state, action: PayloadAction<IUser>) {
      state.name = action.payload.name;
      state.roomId = action.payload.roomId;
      state.userId = action.payload.userId;
      state.host = action.payload.host;
      state.scrum = action.payload.scrum;
    },

    removeUser(state) {
      console.log("REMOVE_USER", state.userId);
      socket.emit(REMOVE_USER, {
        userId: state.userId,
        roomId: state.roomId,
      });

      state.name = "";
      state.roomId = 0;
      state.userId = null;
      state.host = false;
      state.scrum = 0;
    },

    clearUserData(state) {
      state.name = "";
      state.roomId = 0;
      state.userId = null;
      state.host = false;
      state.scrum = 0;

      window.localStorage.setItem("user", "");
    },
  },
});

export default userSlice.reducer;
