import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import React from "react";
import { useLocation } from "react-router";
export default function BreadcrumbBar() {
  const pathname = useLocation().pathname;
  const splitPathname = pathname.split("/").filter(Boolean); // Remove strings vazias

  return (
    <Breadcrumb className="hidden sm:block">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" aria-label="Página inicial">
            Tem Controle
          </BreadcrumbLink>
        </BreadcrumbItem>

        {splitPathname.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${splitPathname.slice(0, index + 1).join("/")}`}
                aria-label={`Navegar para ${segment}`}
              >
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
