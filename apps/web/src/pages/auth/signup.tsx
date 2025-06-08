import financas2 from "@/assets/financas2.png";
import Helmet from "@/components/helmet";
import { SignUp } from "@clerk/clerk-react";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router";

export default function Cadastro() {
  const beneficios = [
    "Controle financeiro completo",
    "Gestão de estoque simplificada",
    "Relatórios detalhados",
    "Suporte personalizado",
    "Backup automático",
  ];

  return (
    <>
      <Helmet
        title="Cadastro"
        description="Crie sua conta gratuita no Tem Controle e comece a gerenciar suas finanças de forma eficiente"
      />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          {/* Botão Voltar */}
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para página inicial
          </Link>

          <div className="flex flex-col-reverse md:grid lg:grid-cols-2 gap-8 md:gap-12 items-center rounded-2xl bg-white shadow-xl overflow-hidden">
            {/* Formulário */}
            <div className="w-full max-w-md mx-auto px-4 sm:px-8 py-8 md:py-12">
              <SignUp
                appearance={{
                  elements: {
                    formButtonPrimary:
                      "bg-blue-600 hover:bg-blue-700 transition-colors",
                    card: "shadow-none",
                  },
                }}
              />
            </div>

            {/* Imagem e Mensagem */}
            <div className="relative hidden md:block h-full min-h-[600px] bg-blue-600">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 to-blue-700/85 z-10" />
              <img
                src={financas2}
                alt="Finanças sob controle"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 lg:p-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-white">
                  Transforme sua gestão financeira
                </h2>

                <div className="space-y-4">
                  {beneficios.map((beneficio, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-lg text-blue-50">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-blue-600">
              © {new Date().getFullYear()} Tem Controle. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
