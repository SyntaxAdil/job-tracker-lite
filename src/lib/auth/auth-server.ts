import "server-only";
import { headers } from "next/headers";
import { createAuthClient } from "better-auth/client";

const serverClient = createAuthClient({
  baseURL: process.env.BACKEND_URL,
});

export async function getSession() {
  const { data } = await serverClient.getSession({
    fetchOptions: { headers: await headers() },
  });
  return data;
}
