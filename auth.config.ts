import config from "@/config.json";
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages:     {
    signIn: "login",
  },
  secret:    config.authSecret,
  providers: [],
} satisfies NextAuthConfig;