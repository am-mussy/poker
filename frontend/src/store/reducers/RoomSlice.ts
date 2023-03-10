import { IRoom, IUser } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CHANGE_SCRAM_POINT_VISIBILITY,
  CLEAR_VOTES_VALUE,
  socket,
} from "../../API/socket";

const initialState: IRoom = {
  roomId: 0,
  users: [],
  scramPointIsHidden: true,
};
export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    roomUpdate(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
      state.roomId =
        action.payload[0].roomId === null ? 0 : action.payload[0].roomId;
    },
    changeScramPointVisibility(state, action: PayloadAction<boolean>) {
      state.scramPointIsHidden = action.payload;

      socket.emit(CHANGE_SCRAM_POINT_VISIBILITY, {
        roomId: state.roomId,
        isVisible: state.scramPointIsHidden,
      });
    },
    clearVotesValueAction(state) {
      socket.emit(CLEAR_VOTES_VALUE, {
        roomId: state.roomId,
      });
    },
  },
});

export default roomSlice.reducer;
