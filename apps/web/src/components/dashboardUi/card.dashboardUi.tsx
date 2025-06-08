import { DollarSign, Package, ShoppingCart, Users, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    trend: 'up' | 'down';
    text?: string;
  };
  alert?: {
    text: string;
    type: 'warning' | 'error' | 'success';
  };
}

const StatCard = ({ title, value, icon, change, alert }: StatCardProps) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          {value}
        </motion.div>
        {change && (
          <div className="flex items-center text-xs">
            <div className={`flex items-center ${
              change.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {change.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              <span className="font-medium">{change.value}%</span>
            </div>
            <span className="text-gray-500 ml-1">{change.text || 'em relação ao mês anterior'}</span>
          </div>
        )}
        {alert && (
          <div className={`text-xs font-medium ${
            alert.type === 'warning' ? 'text-amber-600' : 
            alert.type === 'error' ? 'text-red-600' : 
            'text-green-600'
          }`}>
            {alert.text}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function CardDashboardUi() {
  const stats: StatCardProps[] = [
    {
      title: "Receita Total",
      value: "R$ 67.000",
      icon: <DollarSign className="h-4 w-4 text-blue-600" />,
      change: { value: 12, trend: 'up' }
    },
    {
      title: "Pedidos",
      value: "142",
      icon: <ShoppingCart className="h-4 w-4 text-blue-600" />,
      change: { value: 8, trend: 'up' }
    },
    {
      title: "Clientes",
      value: "89",
      icon: <Users className="h-4 w-4 text-blue-600" />,
      change: { value: 5, trend: 'up' }
    },
    {
      title: "Produtos",
      value: "234",
      icon: <Package className="h-4 w-4 text-blue-600" />,
      alert: { 
        text: "3 produtos com estoque baixo",
        type: 'warning'
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
