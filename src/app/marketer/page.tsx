import PendingScreen from "@/components/Marketer/PendingScreen";
import RejectedScreen from "@/components/Marketer/RejectedScreen";
import { marketing_profile_list } from "@/services/marketingActions";
import { redirect } from "next/navigation";

export default async function MarketerEntryPage() {
  const res = await marketing_profile_list();

  if (!res.success || !res.data) {
    redirect("/marketer/register");
  }

  const marketer = res.data;

  switch (marketer.status) {
    case "approved":
      redirect("/marketer/dashboard");
    case "pending":
      return <PendingScreen />;
    case "rejected":
      return <RejectedScreen />;
    default:
      redirect("/marketer/register");
  }
}
