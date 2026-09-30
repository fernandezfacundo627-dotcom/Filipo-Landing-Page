import type { ComponentType } from "react";
import instagramImg from "../assets/icons/instagram.png";
import pedidosyaImg from "../assets/icons/pedidosya.png";
import whatsappImg from "../assets/icons/whatsapp.png";
import facebookImg from "../assets/icons/facebook.png";

export type IconComponent = ComponentType<{ className?: string }>;

interface IconProps {
  className?: string;
}

/** Componente genérico para renderizar los logos de apps con máscara y herencia de color (currentColor) */
function AppIcon({ src, className = "" }: { src: string; className?: string }) {
  const hasExplicitSize = /\b(size-|w-|h-)/.test(className);
  const sizeClass = hasExplicitSize ? "" : "size-5";

  return (
    <span
      className={`inline-block shrink-0 ${sizeClass} ${className}`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        backgroundColor: "currentColor",
      }}
      aria-hidden="true"
    />
  );
}

/** Instagram — Logo provisto por el usuario */
export function InstagramIcon({ className = "" }: IconProps) {
  return <AppIcon src={instagramImg} className={className} />;
}

/** PedidosYa — Logo provisto por el usuario ('P' distintiva) */
export function PedidosYaIcon({ className = "" }: IconProps) {
  return <AppIcon src={pedidosyaImg} className={className} />;
}

/** WhatsApp — Logo provisto por el usuario (globo de diálogo y teléfono) */
export function WhatsAppIcon({ className = "" }: IconProps) {
  return <AppIcon src={whatsappImg} className={className} />;
}

/** Facebook — Logo provisto por el usuario (insignia circular con corte 'f') */
export function FacebookIcon({ className = "" }: IconProps) {
  return <AppIcon src={facebookImg} className={className} />;
}

/** Rutas directas a las imágenes de los logos para cualquier otro uso */
export const APP_LOGOS = {
  instagram: instagramImg,
  pedidosya: pedidosyaImg,
  whatsapp: whatsappImg,
  facebook: facebookImg,
};



