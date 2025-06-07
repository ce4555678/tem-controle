import { Menu, UserCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo, useState } from "react";
import logo from "@/assets/tem-controle.svg";

const HeaderHomeUi = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center">
              {/* <DollarSign className="h-5 w-5 text-white" /> */}
              <img src={logo} />
            </div>
            <span className="text-xl font-bold text-blue-900">
              Tem Controle
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
            >
              Funcionalidades
            </a>
            <a
              href="#pricing"
              className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
            >
              Preços
            </a>
            <a
              href="#testimonials"
              className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
            >
              Depoimentos
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="hidden sm:inline-flex border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <UserCircle /> Entrar
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-blue-700" />
              ) : (
                <Menu className="h-6 w-6 text-blue-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-100">
            <nav className="flex flex-col space-y-4 pt-4">
              <a
                href="#features"
                className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Funcionalidades
              </a>
              <a
                href="#pricing"
                className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Preços
              </a>
              <a
                href="#testimonials"
                className="text-blue-700 hover:text-blue-900 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Depoimentos
              </a>
              <Button
                variant="outline"
                className="self-start border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <UserCircle /> Entrar
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default memo(HeaderHomeUi);
