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
      {users.map((user:IUser, index:number) => {
        return (
            <UserLine key={`${index}_key`} name={user.name ?? "NO NAME"} scrum={user.scrum} />
        )
      })}
    </div>
  );
};

export default UserList;
