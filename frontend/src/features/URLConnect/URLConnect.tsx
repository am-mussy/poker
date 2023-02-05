import React, { ChangeEvent, useState } from "react";
import { userSlice } from "../../store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Card from "../../shared/Card/Card";
import InputText from "../../shared/Input/InputText/InputText";
import NeuButton from "../../shared/button/NeuButton";
import "./urlConnect.css";
import { useNavigate } from "react-router-dom";

const UrlConnect = () => {
  const { connect } = userSlice.actions;
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { roomId } = useAppSelector((state) => state.userReducer);
  const buttonHandler = () => {
    dispatch(connect({ name: name, roomId: roomId }));
    roomId && navigate(`/room/${roomId}`);
  };

  const onChangeRoomId = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className={"url-connect-root"}>
      <Card height={200} width={300} className={"url-connect-wrapper"}>
        <div className={"input-wrapper"}>
          <InputText
            value={name}
            onChange={onChangeRoomId}
            placeholder={"Enter your name"}
          />
          <NeuButton name={"CONNECT"} onClick={buttonHandler} className={""} />
        </div>
      </Card>
    </div>
  );
};

export default UrlConnect;
