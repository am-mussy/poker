import React from "react";
import { IUser } from "../../../types/types";
import "./userList.css";
import UserLine from "./userLine/UserLine";

type UserListProps = {
  users: IUser[];
};

const UserList = ({ users }: UserListProps) => {
  return (
    <div className={"user-list-root"}>
      {users.map(({ name, scram }, index) => (
        <UserLine key={`${index}_key`} name={name ?? "NO NAME"} scram={scram} />
      ))}
    </div>
  );
};

export default UserList;
