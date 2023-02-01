import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import http from "http";

import { Server } from "socket.io";
import {
  SET_SCRAM_POINT,
  CHANGE_SCRAM_POINT_VISIBILITY,
  CLEAR_VOTES_VALUE,
  RECONNECT,
  HOST_ROOM,
  CONNECT_ROOM,
  UPDATE_SCRAM_POINT,
  UPDATE_USER_ID,
} from "./actions.js";
import { generateID } from "./helpers.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server);
const adapter = new JSONFile("db.json");
const db = new Low(adapter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const reconnect = (socket) => {
  socket.on(RECONNECT, async ({ roomId }) => {
    if (db.data.rooms[roomId]) {
      const users = db.data.rooms[roomId].users;

      if (users) {
        socket.join(roomId);
        io.to(roomId).emit(RECONNECT, users);
      }
    }
  });
};

const clearVotesValue = (socket) => {
  socket.on(CLEAR_VOTES_VALUE, async ({ roomId }) => {
    if (db.data.rooms[roomId]) {
      db.data.rooms[roomId].users = db.data.rooms[roomId].users.map((user) => ({
        ...user,
        scrum: 0,
      }));
      socket.join(roomId);
      io.to(roomId).emit(CLEAR_VOTES_VALUE, db.data.rooms[`${roomId}`].users);
      await adapter.write(db.data);
    }
  });
};

const setScramPoint = (socket) => {
  socket.on(SET_SCRAM_POINT, async ({ roomId, userId, scrumPoint }) => {
    db.data.rooms[`${roomId}`].users = db.data.rooms[`${roomId}`].users.map(
      (user) => {
        if (user.userId === userId) {
          return { ...user, scrum: scrumPoint };
        } else {
          return user;
        }
      }
    );

    socket.join(roomId);
    io.to(roomId).emit(UPDATE_SCRAM_POINT, db.data.rooms[`${roomId}`].users);

    await adapter.write(db.data);
  });
};

const changeScramPointVisibility = (socket) => {
  socket.on(CHANGE_SCRAM_POINT_VISIBILITY, async (data) => {
    const { roomId, isVisible } = data;
    if (isVisible !== db.data.rooms[`${roomId}`].scramPointIsHidden) {
      db.data.rooms[`${roomId}`].scramPointIsHidden = isVisible;
      await adapter.write(db.data);
      socket.join(roomId);
      io.to(roomId).emit(CHANGE_SCRAM_POINT_VISIBILITY, isVisible);
    }
  });
};

const createRoom = async (roomId) => {
  if (!db.data.rooms[`${roomId}`]) {
    db.data.rooms[`${roomId}`] = { scramPointIsHidden: true };
    db.data.rooms[`${roomId}`]["users"] = [];
    await adapter.write(db.data);
    console.log(`Комнта:${roomId} создана`);
  } else {
    console.error("Комната с таким ID уже есть");
  }
};

const createUser = async ({ name, host, roomId, scrum, userId }) => {
  if (db.data.rooms[`${roomId}`]) {
    db.data.rooms[`${roomId}`].users.push({
      name: name,
      host: host,
      roomId: roomId,
      scrum: scrum,
      userId: userId,
    });
    await adapter.write(db.data);
    console.log(`Пользователь ${name} с id ${userId} создан`);
  } else {
    console.error(`Комнта ${roomId} не найдена`);
  }
};

const addUserInRoom = async ({ roomId, name, host, scrum, userId }) => {
  if (db.data.rooms[`${roomId}`]) {
    db.data.rooms[`${roomId}`].users.push({
      name: name,
      host: host,
      roomId: roomId,
      scrum: scrum,
      userId: userId,
    });

    await adapter.write(db.data);
  }
};

const hostRoom = (socket) => {
  socket.on(HOST_ROOM, async ({ name, host, roomId, scrum }) => {
    const userId = generateID();
    await createRoom(roomId);
    await createUser({ name, host, roomId, scrum, userId });
    socket.join(roomId);
    io.to(roomId).emit(HOST_ROOM, db.data.rooms[`${roomId}`]);
    io.to(roomId).emit(UPDATE_USER_ID, userId);
  });
};

const connectToRoom = async (socket) => {
  socket.on(CONNECT_ROOM, async ({ name, host, roomId, scrum }) => {
    const userId = generateID();
    await addUserInRoom({ name, host, roomId, scrum, userId });
    socket.join(roomId);
    io.to(roomId).emit(CONNECT_ROOM, db.data.rooms[`${roomId}`].users);
    io.to(roomId).emit(UPDATE_USER_ID, userId);
  });
};

io.on("connection", async (socket) => {
  // joinToRoom(socket);
  // updateUsersList(socket);

  await hostRoom(socket);
  await connectToRoom(socket);
  await clearVotesValue(socket);
  await changeScramPointVisibility(socket);
  await setScramPoint(socket);
  await reconnect(socket);
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
