import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PricingHomeUi = () => {
  const features = [
    "Controle financeiro completo",
    "Gestão de pedidos ilimitados",
    "Controle de estoque avançado",
    "Base de clientes ilimitada",
    "Agenda integrada",
    "Funciona offline",
    "Sincronização automática",
    "Suporte prioritário",
    "Relatórios detalhados",
    "Backup automático",
  ];

  return (
    <section
      id="pricing"
      className="py-8 sm:py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho mais responsivo */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-3 sm:mb-4">
            Comece grátis por 14 dias
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-700 mb-8 sm:mb-12 md:mb-16 px-4 sm:px-8">
            Teste todas as funcionalidades sem compromisso. Depois apenas R$
            12,90/mês.
          </p>

          {/* Card Principal com melhor responsividade */}
          <Card className="relative max-w-2xl mx-auto border-2 border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
            {/* Badge de destaque responsiva */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 sm:py-3 px-3 sm:px-6">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-base sm:text-lg font-bold">
                  🎉 14 DIAS GRÁTIS
                </span>
              </div>
            </div>

            <CardHeader className="pt-14 sm:pt-16 pb-4 sm:pb-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Plano Completo
              </CardTitle>
              <CardDescription className="text-blue-100 text-base sm:text-lg">
                Acesso total às funcionalidades
              </CardDescription>

              {/* Preço responsivo */}
              <div className="mt-4 sm:mt-6 text-center">
                <div className="text-xs sm:text-sm text-blue-200 mb-2">
                  Após o período gratuito:
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                  R$ 12,90
                  <span className="text-lg sm:text-xl font-normal text-blue-200">
                    /mês
                  </span>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                  Cancele quando quiser
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 md:p-8">
              {/* Lista de funcionalidades responsiva */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mb-4 sm:mb-6 text-center">
                  Tudo que você precisa para crescer:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 sm:space-x-3"
                    >
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-blue-700 text-sm sm:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action responsivo */}
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="hidden sm:inline">
                    Começar Teste Grátis Agora
                  </span>
                  <span className="sm:hidden">Começar Agora</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                <div className="text-center">
                  <p className="text-xs sm:text-sm text-blue-600 px-2 sm:px-0">
                    ✓ Sem cartão de crédito • ✓ Sem compromisso • ✓ Cancele
                    quando quiser
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Garantia responsiva */}
          <div className="mt-8 sm:mt-12 text-center px-4">
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-green-200">
              <span className="text-xl sm:text-2xl">🛡️</span>
              <span className="text-sm sm:text-base font-medium">
                Garantia de 30 dias ou seu dinheiro de volta
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHomeUi;
