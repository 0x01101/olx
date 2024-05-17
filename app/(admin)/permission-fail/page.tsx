import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import ReactPlayer from "react-player";
import { RickRoll } from "@/components/rick-roll";

export default async function Page (): Promise<JSX.Element>
{
  return (
    <div className={"w-screen h-screen"}>
      <Link href={"/"}>
        <div className={"absolute top-0 left-0 flex flex-row items-center"}>
          <IoArrowBack className={"w-10 h-10"}/>
          <p className={"text-xl font-bold"}>Go back</p>
        </div>
      </Link>
      <div className={"flex items-center justify-center h-full"}>
        <h1 className={"text-4xl font-semibold text-center"}>
          You do not have permission to view this page
        </h1>
      </div>
    </div>
  
  );
}