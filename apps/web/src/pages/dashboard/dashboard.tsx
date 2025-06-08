import { memo, useEffect, useRef } from "react";
import LayoutDashboard from "./layout";
import Helmet from "@/components/helmet";
import { clientDb } from "@/db/db";
import { toast } from "sonner";
import { sql } from "@/db/sql";
import DashboardUi from "@/components/dashboardUi";

function Dashboard() {
  const initialized = useRef(false);

  const initializeDb = async () => {
    try {
      await clientDb.exec(sql);
      toast.success("Sistema inicializado com sucesso!");
    } catch (error) {
      toast.error("Erro ao inicializar o sistema");
      console.error("Erro na inicialização:", error);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initializeDb();
    }
  }, []);

  return (
    <>
      {" "}
      <Helmet
        title="Dashboard"
        description="Painel de controle do Tem Controle - Gerencie suas finanças"
      />{" "}
      <LayoutDashboard>
        <div className="mx-auto px-4 container">
        <DashboardUi.card />
        </div>
      </LayoutDashboard>
    </>
  );
}

export default memo(Dashboard);
