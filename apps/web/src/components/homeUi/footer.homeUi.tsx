import { DollarSign } from "lucide-react";

const FooterHomeUi = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">GestãoPro</span>
            </div>
            <p className="text-blue-200 text-sm md:text-base">
              A plataforma completa para autônomos que querem crescer.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-blue-200 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Preços
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integrações
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-blue-200 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-blue-200 text-sm md:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Carreira
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-blue-200 text-sm md:text-base">
          <p>&copy; 2025 Tem Controle. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterHomeUi;
