import auth from "@feathersjs/authentication-client"
import socketio from "@feathersjs/socketio-client"
import { atom } from "nanostores"
import { createClient } from "protofun-service"
import io from "socket.io-client"

export const $connectionLost = atom<boolean>(false)

const socket = io(process.env.NEXT_PUBLIC_PROTOFUN_SERVICE as string)
socket.on("connect", () => {
  $connectionLost.set(false)
})

socket.on("disconnect", () => {
  $connectionLost.set(true)
})

socket.on("connect_error", () => {
  $connectionLost.set(true)
})

const app = createClient(socketio(socket))
app.configure(auth())

export { app, socket }
