import PreInvoice from "./PreInvoice";
import { GetUserDashboard } from "@/services/authActions";
import { GetShippingServices } from "@/services/shopActions";

async function Page({ params }: any) {
  const data = await GetUserDashboard();
  const { data: shippingServices }: any = await GetShippingServices();
  console.log(data);
  const orderId = Number(params.id);
  const foundOrder = data.pre_invoices.find(
    (order: any) => order.id == orderId
  );
  console.log(data);

  // if (!foundOrder) return notFound();

  const shipping = shippingServices.find(
    (s: any) => s.id == foundOrder.shipping_service
  );

  const shippingName = shipping?.name || "نامشخص";

  return (
    <div>
      <PreInvoice order={foundOrder} shippingName={shippingName} />
    </div>
  );
}

export default Page;
