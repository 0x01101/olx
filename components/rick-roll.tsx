"use client";

import ReactPlayer from "react-player";

export function RickRoll (): JSX.Element
{
  return (
    <ReactPlayer
      url={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
      playing={true}
      loop={true}
      muted={false}
      width={"100%"}
      height={"100%"}
      controls={false}
    />
  );
}