import { GetUserDashboard } from "@/services/authActions";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function layout({ children }: { children: ReactNode }) {
  const user = await GetUserDashboard();
  if (!user) return redirect("/");
  return <div className="size-full flex-1 inline-flex flex-col">{children}</div>;
}

export default layout;
