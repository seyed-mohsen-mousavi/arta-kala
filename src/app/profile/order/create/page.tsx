import CreateOrder from "@/components/Profile/CreateOrder";
import { GetUserDashboard } from "@/services/authActions";
import { GetShippingServices } from "@/services/shopActions";
import { redirect } from "next/navigation";

export default async function Page() {
  const { cart } = await GetUserDashboard();

  if (!cart?.items?.length) {
    redirect("/profile/cart");
  }

  const { data }: any = await GetShippingServices();
  return <CreateOrder shippingServices={data} />;
}
