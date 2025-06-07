import { memo, useEffect } from "react";

interface HelmetProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

const Helmet = ({
  title,
  description = "Gerencie suas finanças de forma simples e eficiente com o Tem Controle",
  canonical,
  ogImage = "https://temcontrole.com/og-image.png", // Ajuste para sua URL real
}: HelmetProps) => {
  useEffect(() => {
    // Atualiza o título
    document.title = title ? `${title} - Tem Controle` : "Tem Controle";

    // Atualiza a meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Atualiza as meta tags Open Graph
    const metaTags = {
      "og:title": title,
      "og:description": description,
      "og:image": ogImage,
      "og:type": "website",
      "og:site_name": "Tem Controle",
    };

    Object.entries(metaTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });

    // Atualiza o link canônico se fornecido
    let link = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // Cleanup function
    return () => {
      document.title = "Tem Controle";
    };
  }, [title, description, canonical, ogImage]);

  return null;
};

export default memo(Helmet);
