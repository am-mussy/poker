import { IRoom, IUser } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CHANGE_SCRAM_POINT_VISIBILITY, socket } from "../../API/socket";

const initialState: IRoom = {
  roomId: 0,
  users: [],
  scramPointIsHidden: true,
};
export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<IUser[]>) {
      console.log("initialize", action.payload);
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
  },
});

export default roomSlice.reducer;
