import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { LOGO } from "./data/site";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Specialties from "./components/Specialties";

import Delivery from "./components/Delivery";
import Experience from "./components/Experience";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import DeliveryModal from "./components/DeliveryModal";
import ReservationModal from "./components/ReservationModal";
import IntroLoader from "./components/IntroLoader";

export default function App() {
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [siteReady, setSiteReady] = useState(false);

  const openDelivery = useCallback(() => setDeliveryOpen(true), []);
  const closeDelivery = useCallback(() => setDeliveryOpen(false), []);

  const openReservation = useCallback(() => setReservationOpen(true), []);
  const closeReservation = useCallback(() => setReservationOpen(false), []);

  const handleReveal = useCallback(() => setSiteReady(true), []);

  /* Si se subió el logo propio, también se usa como favicon */
  useEffect(() => {
    if (!LOGO) return;
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) return;
    const original = link.href;
    link.href = LOGO;
    return () => {
      link.href = original;
    };
  }, []);

  return (
    <div className="min-h-screen bg-ink text-cream">
      {/* Animación de entrada al entrar a la página */}
      <IntroLoader onReveal={handleReveal} />

      {/* Grano cinematográfico global */}
      <div className="grain" aria-hidden="true" />

      <Navbar
        onOpenDelivery={openDelivery}
        onOpenReservation={openReservation}
        ready={siteReady}
      />

      <main>
        <Hero
          onOpenDelivery={openDelivery}
          onOpenReservation={openReservation}
          ready={siteReady}
        />
        <Marquee />
        <About />
        <Specialties />
        <Experience />
        <Gallery />
        <Testimonials />
        <Delivery />
        <Contact onOpenReservation={openReservation} />
      </main>

      <Footer />
      <FloatingButtons />
      <DeliveryModal open={deliveryOpen} onClose={closeDelivery} />
      <ReservationModal open={reservationOpen} onClose={closeReservation} />
    </div>
  );
}
