import auth from "@feathersjs/authentication-client"
import socketio from "@feathersjs/socketio-client"
import { createClient } from "protofun-service"
import io from "socket.io-client"

const socket = io(process.env.NEXT_PUBLIC_PROTOFUN_SERVICE as string)
const app = createClient(socketio(socket))
app.configure(auth())

export { app }
