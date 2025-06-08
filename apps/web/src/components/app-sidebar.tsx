import * as React from "react"
import {
  BoxesIcon,
  BoxIcon,
  ChartAreaIcon,
  NotebookTabsIcon,
  Settings2Icon,
  Users,
  WalletIcon,
} from "lucide-react"
import logo from "@/assets/tem-controle.svg"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"

const navigationItems = {
  mainNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartAreaIcon,
      isActive: true,
    },
    {
      title: "Agenda",
      url: "/dashboard/agenda",
      icon: NotebookTabsIcon,
      items: [
        { title: "Calendário", url: "/dashboard/agenda/calendar" },
        { title: "Compromissos", url: "/dashboard/agenda/appointments" },
        { title: "Lembretes", url: "/dashboard/agenda/reminders" },
      ],
    },
    {
      title: "Clientes",
      url: "/dashboard/clientes",
      icon: Users,
      items: [
        { title: "Lista de Clientes", url: "/dashboard/clientes/lista" },
        { title: "Cadastrar Novo", url: "/dashboard/clientes/novo" },
        { title: "Relatórios", url: "/dashboard/clientes/relatorios" },
      ],
    },
    {
      title: "Estoque",
      url: "/dashboard/estoque",
      icon: BoxesIcon,
      items: [
        { title: "Produtos", url: "/dashboard/estoque/produtos" },
        { title: "Categorias", url: "/dashboard/estoque/categorias" },
        { title: "Movimentações", url: "/dashboard/estoque/movimentacoes" },
      ],
    },
    {
      title: "Finanças",
      url: "/dashboard/financas",
      icon: WalletIcon,
      items: [
        { title: "Visão Geral", url: "/dashboard/financas/overview" },
        { title: "Receitas", url: "/dashboard/financas/receitas" },
        { title: "Despesas", url: "/dashboard/financas/despesas" },
        { title: "Relatórios", url: "/dashboard/financas/relatorios" },
      ],
    },
    {
      title: "Pedidos",
      url: "/dashboard/pedidos",
      icon: BoxIcon,
      items: [
        { title: "Todos os Pedidos", url: "/dashboard/pedidos/todos" },
        { title: "Novo Pedido", url: "/dashboard/pedidos/novo" },
        { title: "Em Andamento", url: "/dashboard/pedidos/andamento" },
        { title: "Finalizados", url: "/dashboard/pedidos/finalizados" },
      ],
    },
    {
      title: "Configurações",
      url: "/dashboard/config",
      icon: Settings2Icon,
      items: [
        { title: "Perfil", url: "/dashboard/config/perfil" },
        { title: "Empresa", url: "/dashboard/config/empresa" },
        { title: "Preferências", url: "/dashboard/config/preferencias" },
        { title: "Integrações", url: "/dashboard/config/integracoes" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" className="border-r border-gray-200" {...props}>
      <SidebarHeader className="px-4 py-3 border-b border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <div className="bg-white shadow-sm border border-gray-100 flex aspect-square size-10 items-center justify-center rounded-lg">
                  <img 
                    src={logo} 
                    alt="Tem Controle Logo"
                    className="size-8 p-1" 
                  />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="text-base font-semibold text-gray-900">
                    Tem Controle
                  </span>
                  <span className="text-xs font-medium text-blue-600">
                    Período Gratuito
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <NavMain items={navigationItems.mainNav} />
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
