import auth from "@feathersjs/authentication-client";
import socketio from "@feathersjs/socketio-client";
import { createClient } from "protofun-service";
import io from "socket.io-client";

const socket = io("http://localhost:3030");
const app = createClient(socketio(socket));
app.configure(auth());

export { app };
