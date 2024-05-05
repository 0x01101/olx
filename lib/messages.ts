import * as messages from "@/assets/text/messages.json";
import * as jokeMessages from "@/assets/text/jokeMessages.json";

export const jokeFeatures: boolean = process.env.JOKE_FEATURES === "true";
export const messageProvider = jokeFeatures ? { ...jokeMessages, ...messages } : { ...messages, ...jokeMessages };