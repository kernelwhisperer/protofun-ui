import { $user } from "../stores/user";
import { app } from "./feathers-app";

export async function checkLogin() {
  try {
    const { user } = await app.reAuthenticate();
    $user.set(user);
  } catch (error) {}
}

export async function login(email: string, password: string) {
  const { user } = await app.authenticate({
    email,
    password,
    strategy: "local",
  });

  $user.set(user);
}

export async function logout() {
  await app.logout();
  $user.set(null);
}

export async function signUp(email: string, password: string) {
  await app.service("users").create({
    email,
    password,
  });

  await login(email, password);
}
