import { auth } from "@/auth";
import Home from "./home";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session?.user) redirect("/");

  return <Home />;
}
