import CreateOrder from "@/components/Profile/CreateOrder";
import { GetShippingServices } from "@/services/shopActions";
export default async function Page() {
  const { data }: any = await GetShippingServices();
  console.log(data);
  return <CreateOrder shippingServices={data} />;
}
