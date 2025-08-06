
import CreateOrder from "@/components/Profile/CreateOrder";
import { GetShippingServices } from "@/services/shopActions";
import { redirect } from "next/navigation";

export default async function Page() {
  const shippingServicesResponse = await GetShippingServices();

  if (!shippingServicesResponse) {
    redirect("/profile/cart");
  }

  return <CreateOrder shippingServices={shippingServicesResponse.data} />;
}
