import React from "react";
import { IUser } from "../../../types/types";
import "./userList.css";
import UserLine from "./userLine/UserLine";
import { useAppSelector } from "../../../hooks/hooks";

type UserListProps = {
  users: IUser[];
};

const UserList = ({ users }: UserListProps) => {
  const isHidden = useAppSelector(
    (state) => state.roomReducer.scramPointIsHidden
  );

  let UsersLine;

  if (!isHidden) {
    const arrayForSort = [...users];
    const sortUsers = arrayForSort.sort((n1: IUser, n2: IUser) => {
      if (n1.scrum && n2.scrum) {
        if (n1.scrum > n2.scrum) {
          return 1;
        }

        if (n1.scrum < n2.scrum) {
          return -1;
        }
      }
      return 0;
    });

    UsersLine = sortUsers.map((user: IUser, index: number) => {
      return (
        <UserLine
          key={`${index}_key`}
          name={user.name ?? "NO NAME"}
          scrum={user.scrum}
        />
      );
    });
  } else {
    UsersLine = users.map((user: IUser, index: number) => {
      return (
        <UserLine
          key={`${index}_key`}
          name={user.name ?? "NO NAME"}
          scrum={user.scrum}
        />
      );
    });
  }

  return <div className={"user-list-root"}>{UsersLine}</div>;
};

export default UserList;
