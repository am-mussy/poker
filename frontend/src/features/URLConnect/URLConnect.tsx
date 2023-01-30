import React, { ChangeEvent, useEffect, useState } from "react";
import { userSlice } from "../../store/reducers/UserSlice";
import { useAppDispatch } from "../../hooks/hooks";
import Card from "../../shared/Card/Card";
import InputText from "../../shared/Input/InputText/InputText";
import NeuButton from "../../shared/button/NeuButton";
import "./urlConnect.css";
import { IUser } from "../../types/types";
const UrlConnect = () => {
  const { connect, reconnect } = userSlice.actions;
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem("user");
    const user = raw && (JSON.parse(raw) as IUser);

    if (user && user.userId && user.roomId) {
      dispatch(reconnect({ userId: user.userId, roomId: user.roomId }));
    }
  }, []);

  const buttonHandler = () => {
    const pathname = window.location.pathname.split("/");
    dispatch(connect({ name: name, roomId: parseInt(pathname[2]) }));
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
