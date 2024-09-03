import { signOutAction } from "@/actions/sign-out";
import Link from "next/link";

type Props = {};

export default async function Home({}: Props) {
  return (
    <main className="w-full h-full text-center p-12  flex flex-col gap-2 items-center justify-center">
      <h2 className="text-6xl font-semibold">
        Remember all your travels with{" "}
        <span className="text-sky-400">Travel Journal</span>
      </h2>
      <p className="text-neutral-300">Create a new travel to get started</p>
    </main>
  );
}
