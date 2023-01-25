export interface IUser {
  name: string | null;
  host?: boolean;
  roomId: number | null;
  scrum?: number;
  userId?: number | null;
}

export interface IRoom {
  users: IUser[];
  scramPointIsHidden: boolean;
  roomId: number;
}
