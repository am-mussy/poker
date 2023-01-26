import { IUser } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UPDATE_USERS,
  JOIN_TO_ROOM,
  SET_SCRAM_POINT,
  socket,
} from "../../API/socket";
import { createUserId } from "../../helpers/random";

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
    createRoom(state, action: PayloadAction<IUser>) {
      state.name = action.payload.name;
      state.roomId = action.payload.roomId;
      state.host = action.payload.host;
      state.userId = createUserId();

      socket.emit(JOIN_TO_ROOM, state);
      socket.emit(UPDATE_USERS, state.roomId);
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
      state.userId = createUserId();

      socket.emit(JOIN_TO_ROOM, state);
      socket.emit(UPDATE_USERS, state.roomId);
    },
  },
});

export default userSlice.reducer;
