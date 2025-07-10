import { redirect } from "next/navigation";

function page() {
  return redirect("/profile/dashboard");
}

export default page;
