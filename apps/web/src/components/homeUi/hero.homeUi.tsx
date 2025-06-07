import { ArrowRight, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroHomeUi = () => {
  return (
    <section
      id="features"
      className="container mx-auto px-4 py-12 md:py-20 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <Badge className="mb-4 md:mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs md:text-sm">
          <Wifi className="w-3 h-3 md:w-4 md:h-4 mr-2" />
          Funciona Online e Offline
        </Badge>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4 md:mb-6 leading-tight">
          Gerencie seu negócio
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent block">
            de forma inteligente
          </span>
        </h1>
        <p className="text-lg md:text-xl text-blue-700 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
          A plataforma completa para autônomos que querem ter controle total do
          seu negócio. Controle financeiro, pedidos, estoque, clientes e agenda
          em um só lugar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 md:mb-12 px-4">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
          >
            Começar Gratuitamente
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <p className="text-sm text-blue-600">
            14 dias grátis • Sem cartão de crédito
          </p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-4 md:p-8 border border-blue-100 mx-4">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Dashboard da plataforma"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroHomeUi;
