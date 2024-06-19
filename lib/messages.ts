import * as messages from "@/assets/text/messages.json";
import * as jokeMessages from "@/assets/text/jokeMessages.json";

export const jokeFeatures: boolean = process.env.JOKE_FEATURES === "true";
console.log( "Joke features are", jokeFeatures ? "enabled" : "disabled" );
export const messageProvider = jokeFeatures ? { ...messages, ...jokeMessages } : { ...jokeMessages, ...messages };