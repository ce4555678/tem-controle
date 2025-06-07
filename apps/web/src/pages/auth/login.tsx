import { LoginForm } from "@/components/login-form";
import financas from "@/assets/financas.png";
import HomeUi from "@/components/homeUi";
import Helmet from "@/components/helmet";

export default function Login() {
  return (
    <>
    <Helmet title="Login"/>
      <HomeUi.header />
      <main className="bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-4 md:py-6 lg:py-8">
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center rounded-2xl bg-white shadow-xl overflow-hidden">
            {/* Formulário */}
            <div className="w-full max-w-md mx-auto px-4 sm:px-8 py-8 md:py-12">
              <LoginForm className="w-full" />
            </div>

            {/* Imagem e Mensagem */}
            <div className="relative hidden md:block h-64 md:h-full bg-blue-600">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-700/90 z-10" />
              <img
                src={financas}
                alt="Finanças sob controle"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Bem-vindo ao Tem Controle
                </h2>
                <p className="text-lg md:text-xl text-blue-100">
                  Gerencie suas finanças de forma simples e eficiente
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-blue-600">
            © {new Date().getFullYear()} Tem Controle. Todos os direitos
            reservados.
          </div>
        </div>
      </main>
    </>
  );
}
