import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { marketing_profile_list } from "@/services/marketingActions";
import { MarketerProvider } from "@/context/MarketerContext";
import { cookies } from "next/headers";
import LayoutWrapper from "./LayoutWrapper";
export const dynamic = 'force-dynamic';

export default async function MarketerPrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) redirect("/");

  const res = await marketing_profile_list();

  if (!res.success || !res.data) {
    redirect("/marketer/register");
  }

  const marketer = res.data;

  if (marketer.status === "pending") {
    redirect("/marketer/pending");
  } else if (marketer.status === "rejected") {
    redirect("/marketer/rejected");
  } else if (marketer.status !== "approved") {
    redirect("/marketer/register");
  }

  return (
    <MarketerProvider initialMarketer={marketer}>
      <LayoutWrapper>{children}</LayoutWrapper>
    </MarketerProvider>
  );
}
