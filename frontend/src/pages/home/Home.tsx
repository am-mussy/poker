import React, { ChangeEvent, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { userSlice } from "../../store/reducers/UserSlice";
import { createRoomId } from "../../helpers/random";

function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [activeCreateRoom, setActiveCreateRoom] = useState(false);
  const [activeConnect, setActiveConnect] = useState(false);

  const navigate = useNavigate();

  const { hostRoom, connect } = userSlice.actions;
  const dispatch = useAppDispatch();

  const connectToHostingRoom = () => {
    setActiveConnect(true);
    setActiveCreateRoom(true);
    const value: number = parseInt(roomId);

    name && roomId && dispatch(connect({ name: name, roomId: value }));
    navigate(`/room/${roomId}`);
  };

  const createHostingRoom = () => {
    const roomId = createRoomId();
    setActiveCreateRoom(true);
    name && dispatch(hostRoom({ name, host: true, roomId: roomId }));

    navigate(`/room/${roomId}`);
  };

  const inputNameValidation = () => {
    if (activeCreateRoom) {
      if (!name) return "inputError inputRoomId";
    } else {
      return "inputRoomId";
    }
  };

  const inputRoomIdValidation = () => {
    if (activeConnect) {
      if (!roomId) return "inputError inputName";
    } else {
      return "inputName";
    }
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.slice(0, 15));
  };

  const onChangeRoomId = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/, "");
    setRoomId(value);
  };
  return (
    <div className={"root-home"}>
      <div className={"room"}>
        <input
          className={inputNameValidation()}
          placeholder={"NAME"}
          value={name}
          onChange={(e) => changeName(e)}
          onClick={() => setActiveConnect(false)}
        />
        <button type="submit" onClick={createHostingRoom}>
          create room
        </button>
        <div className={"connect"}>
          <input
            className={inputRoomIdValidation()}
            value={roomId}
            type="text"
            placeholder={"ROOM ID"}
            onChange={(e) => onChangeRoomId(e)}
          />
          <button type="submit" onClick={connectToHostingRoom}>
            connect
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
