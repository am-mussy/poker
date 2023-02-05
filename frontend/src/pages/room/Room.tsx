import React, { useEffect } from "react";
import "./room.css";
import Vote from "../../widgets/Vote/Vote";
import VotesAnalytics from "../../widgets/VotesAnalytics/VotesAnalytics";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { userSlice } from "../../store/reducers/UserSlice";
import ExitFromRoom from "../../features/ExitFromRoom/ExitFromRoom";
import { IUser } from "../../types/types";

function Room() {
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { updateRoomId, updateUserInfoFromLocalStorage, reconnect } =
    userSlice.actions;
  useEffect(() => {
    let id;
    const pathname = window.location.pathname.split("/")[2];

    const raw = window.localStorage.getItem("user");
    const user = raw && (JSON.parse(raw) as IUser);

    // if (parseInt(pathname) !== userData.roomId && userData.roomId !== 0) {
    //   navigate("/");
    //   window.localStorage.setItem("user", "");
    // }

    if (user && user.userId && user.roomId) {
      id = user.userId;
      const { userId } = user;
      userId && dispatch(updateUserInfoFromLocalStorage(user));
      userId && dispatch(reconnect(user));
    }

    if (!userData.roomId && !id) {
      dispatch(updateRoomId(parseInt(pathname)));
      navigate("/room/connect");
    } else {
      window.localStorage.setItem("user", JSON.stringify(userData));
    }
  }, []);

  return (
    <div className="Room">
      <div className={"main"}>
        <div className={"left"}>
          <div className={"vote-wrapper"}>
            <Vote />
          </div>
        </div>
        <div className={"right"}>
          <div className={"exit-from-room"}>
            <ExitFromRoom />
          </div>
          <div className={"votesAnalytics-wrapper"}>
            <VotesAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
