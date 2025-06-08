import Helmet from "@/components/helmet";
import { UserProfile } from "@clerk/clerk-react";
import LayoutDashboard from "../layout";

export default function Profile() {
  return (
    <LayoutDashboard>
      <Helmet title="Perfil" />
      <div className="flex items-center justify-center w-full">
        <UserProfile />
      </div>
    </LayoutDashboard>
  );
}
