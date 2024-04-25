import { AppProps } from "next/app";
import "@/app/ui/global.css";
import "@/app/lib/processHandlers";

export default function MyApp ( { Component, pageProps }: AppProps )
{
  return <Component {...pageProps} />;
}