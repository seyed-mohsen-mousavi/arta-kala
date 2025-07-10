import PersonalInfoForm from "@/components/Profile/PersonalInfoForm";
import { CiUser } from "react-icons/ci";

function page() {
  return (
    <div className="relative flex flex-col">
      <p className="flex items-center gap-1 font-semibold text-xl">
        <CiUser className="size-8 stroke-1 text-primary" />
        اطلاعات شخصی
      </p>
      <PersonalInfoForm />
    </div>
  );
}

export default page;
