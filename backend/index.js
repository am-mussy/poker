import * as path from "path";
import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import http from "http";
import { Server } from "socket.io";
import {
  UPDATE_USERS,
  JOIN_TO_ROOM,
  SET_SCRAM_POINT,
  CHANGE_SCRAM_POINT_VISIBILITY,
  CLEAR_VOTES_VALUE,
} from "./actions.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const adapter = new JSONFile("db.json");
const db = new Low(adapter);

// app.use(express.static(path.join("../frontend/build")));

const clearVotesValue = (socket) => {
  socket.on(CLEAR_VOTES_VALUE, async ({ roomId }) => {
    if (db.data.rooms[roomId]) {
      db.data.rooms[roomId].users = db.data.rooms[roomId].users.map((user) => ({
        ...user,
        scrum: 0,
      }));
      io.to(roomId).emit(UPDATE_USERS, db.data.rooms[`${roomId}`].users);
      await adapter.write(db.data);
    }
  });
};

const updateUsersList = (socket) => {
  socket.on(UPDATE_USERS, async (roomId) => {
    let roomUsers = [];

    if (db.data.rooms[roomId]) {
      db.data.rooms[roomId].users.forEach((user) => {
        if (user.roomId === roomId) roomUsers.push(user);
      });
      db.data.rooms[roomId].users = roomUsers;

      io.to(roomId).emit(UPDATE_USERS, db.data.rooms[`${roomId}`].users);
    }
  });
};

const joinToRoom = (socket) => {
  socket.on(JOIN_TO_ROOM, async (data) => {
    const { roomId, host } = data;
    socket.join(roomId);

    if (host) {
      if (!db.data.rooms[`${roomId}`]) {
        db.data.rooms[`${roomId}`] = { scramPointIsHidden: true };
        db.data.rooms[`${roomId}`]["users"] = [];
      }

      db.data.rooms[`${roomId}`].users.push({ ...data });
      await adapter.write(db.data);
    } else {
      if (
        Object.keys(db.data.rooms).find((room) => room === roomId.toString())
      ) {
        db.data.rooms[`${roomId}`].users.push({ ...data });
        await adapter.write(db.data);
      } else {
        console.log("Room not exist");
      }
    }
  });
};

const setScramPoint = (socket) => {
  socket.on(SET_SCRAM_POINT, async ({ roomId, userId, scrumPoint }) => {
    db.data.rooms[`${roomId}`].users = db.data.rooms[`${roomId}`].users.map(
      (user) => {
        if (user.userId === userId) {
          // roomId = user.roomId;
          return { ...user, scrum: scrumPoint };
        } else {
          return user;
        }
      }
    );

    await adapter.write(db.data);
    io.to(roomId).emit(UPDATE_USERS, db.data.rooms[`${roomId}`].users);
  });
};

const changeScramPointVisibility = (socket) => {
  socket.on(CHANGE_SCRAM_POINT_VISIBILITY, async (data) => {
    const { roomId, isVisible } = data;
    if (isVisible !== db.data.rooms[`${roomId}`].scramPointIsHidden) {
      db.data.rooms[`${roomId}`].scramPointIsHidden = isVisible;
      await adapter.write(db.data);
      io.to(roomId).emit(CHANGE_SCRAM_POINT_VISIBILITY, isVisible);
    }
  });
};

io.on("connection", async (socket) => {
  joinToRoom(socket);
  updateUsersList(socket);
  setScramPoint(socket);
  changeScramPointVisibility(socket);
  clearVotesValue(socket);
});

const init = async () => {
  await db.read();
  db.data ||= { rooms: {} };

  await adapter.write(db.data);
};

server.listen(4000, () => {
  init();
  console.log("listening on *:4000");
});
