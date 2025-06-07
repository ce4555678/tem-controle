import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTAHomeUi = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para ter controle total do seu negócio?
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto px-4">
          Junte-se a milhares de empreendedores que já escolheram o Tem Controle
          para crescer
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-blue-700 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
        >
          Começar Agora - 14 Dias Grátis
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </section>
  );
};

export default CTAHomeUi;
