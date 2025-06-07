import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsHomeUi = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Consultora de Beleza",
      content:
        "Revolucionou minha forma de trabalhar. Agora tenho controle total do meu negócio!",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Freelancer Designer",
      content:
        "A funcionalidade offline é perfeita para quando estou viajando a trabalho.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Personal Trainer",
      content:
        "Finalmente uma ferramenta que entende as necessidades de quem trabalha sozinho.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-lg md:text-xl text-blue-700 px-4">
            Histórias reais de autônomos que transformaram seus negócios
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-blue-100 h-full">
              <CardContent className="pt-6 h-full flex flex-col">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-blue-700 mb-6 italic flex-grow text-sm md:text-base">
                  "{testimonial.content}"
                </p>
                <div className="mt-auto">
                  <p className="font-semibold text-blue-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-blue-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsHomeUi;
