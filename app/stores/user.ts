import { atom } from "nanostores"
import { User } from "protofun-service"

export const $user = atom<User | null>(null)
