import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  X,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { InstagramIcon } from "./icons";
import { GALLERY_POSTS, type GalleryPost } from "../data/galeria";
import { LINKS, LOGO } from "../data/site";

export default function Gallery() {
  // Índice de foto activa por cada post en la grilla del feed { [postId]: imageIndex }
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({
    "post-combos": 0,
    "post-meriendas": 0,
    "post-tablas": 0,
    "post-wraps": 0,
  });

  // Estado del modal visor: post seleccionado y qué foto de su carrusel está abierta
  const [modalPost, setModalPost] = useState<GalleryPost | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  // Manejador para cambiar de foto en la tarjeta del feed
  const changeCardImage = (postId: string, direction: "prev" | "next", total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => {
      const current = prev[postId] || 0;
      const next = direction === "next" ? (current + 1) % total : (current - 1 + total) % total;
      return { ...prev, [postId]: next };
    });
  };

  // Abrir modal en una foto específica
  const openModal = (post: GalleryPost, imgIdx: number) => {
    setModalPost(post);
    setModalImageIndex(imgIdx);
  };

  // Navegación por teclado dentro del visor modal
  useEffect(() => {
    if (!modalPost) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalPost(null);
      } else if (e.key === "ArrowRight") {
        setModalImageIndex((prev) => (prev + 1) % modalPost.images.length);
      } else if (e.key === "ArrowLeft") {
        setModalImageIndex((prev) => (prev - 1 + modalPost.images.length) % modalPost.images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalPost]);

  return (
    <section id="galeria" className="relative bg-ink py-20 md:py-28 overflow-hidden">
      {/* Resplandor ambiental de fondo dual (Ámbar dorado + Acento Mint) */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(221,124,52,0.18) 0%, rgba(72,209,186,0.14) 42%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Instagram · @filipocaferesto"
          title="Momentos Filipo"
          subtitle="Descubrí nuestras publicaciones y carruseles oficiales"
        />

        {/* Grilla de publicaciones de Instagram (4 carruseles) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {GALLERY_POSTS.map((post, postIdx) => {
            const currentImgIdx = activeImageIndexes[post.id] || 0;
            const currentImage = post.images[currentImgIdx];
            const totalImages = post.images.length;

            return (
              <Reveal key={post.id} delay={postIdx * 120}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-graphite shadow-xl transition-all duration-300 hover:border-gold/40 hover:shadow-[0_20px_45px_-15px_rgba(221,124,52,0.2)]">
                  {/* Encabezado del Post (Perfil de Instagram) */}
                  <div className="flex items-center justify-between border-b border-cream/8 px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-3">
                      {LOGO ? (
                        <img
                          src={LOGO}
                          alt="Filipo"
                          className="size-9 rounded-full border border-gold/40 object-contain p-0.5"
                        />
                      ) : (
                        <span className="flex size-9 items-center justify-center rounded-full border border-gold/50 bg-gold/15 font-display text-xs font-bold text-gold">
                          F
                        </span>
                      )}
                      <div>
                        <h4 className="flex items-center gap-1.5 text-xs font-bold text-cream">
                          filipocaferesto
                          <Sparkles className="size-3 text-gold" />
                        </h4>
                        <p className="text-[10px] text-cream/50">{post.location}</p>
                      </div>
                    </div>

                    <a
                      href={LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream/60 transition-colors hover:text-gold"
                      aria-label="Abrir Instagram"
                    >
                      <InstagramIcon className="size-4" />
                    </a>
                  </div>

                  {/* Contenedor de Imagen y Carrusel */}
                  <div
                    onClick={() => openModal(post, currentImgIdx)}
                    className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden bg-coal select-none"
                    role="button"
                    tabIndex={0}
                    aria-label={`Ver publicación: ${post.title}`}
                    onKeyDown={(e) => e.key === "Enter" && openModal(post, currentImgIdx)}
                  >
                    {/* Imagen activa con suave animación de escala (sin overlays de likes ni comentarios) */}
                    <img
                      src={currentImage}
                      alt={`${post.title} - foto ${currentImgIdx + 1}`}
                      loading="lazy"
                      className="img-warm h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Badge indicador de carrusel tipo Instagram (arriba a la derecha) */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-coal/80 px-2.5 py-1 text-[10px] font-bold text-cream backdrop-blur-md border border-cream/10">
                      <Layers className="size-3 text-gold" />
                      <span>
                        {currentImgIdx + 1}/{totalImages}
                      </span>
                    </div>

                    {/* Etiqueta de categoría (arriba a la izquierda) */}
                    <span
                      className={`absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${
                        post.id === "post-combos" || post.id === "post-wraps"
                          ? "border border-mint/40 bg-coal/85 text-mint shadow-[0_0_12px_-2px_rgba(72,209,186,0.35)]"
                          : "border border-gold/40 bg-coal/85 text-gold"
                      }`}
                    >
                      {post.tag}
                    </span>

                    {/* Flecha anterior en la foto */}
                    {totalImages > 1 && (
                      <button
                        type="button"
                        onClick={(e) => changeCardImage(post.id, "prev", totalImages, e)}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex size-8 cursor-pointer items-center justify-center rounded-full bg-coal/75 text-cream/90 backdrop-blur-sm transition-all hover:bg-gold hover:text-ink hover:scale-110 shadow-md"
                        aria-label="Foto anterior"
                      >
                        <ChevronLeft className="size-4" />
                      </button>
                    )}

                    {/* Flecha siguiente en la foto */}
                    {totalImages > 1 && (
                      <button
                        type="button"
                        onClick={(e) => changeCardImage(post.id, "next", totalImages, e)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex size-8 cursor-pointer items-center justify-center rounded-full bg-coal/75 text-cream/90 backdrop-blur-sm transition-all hover:bg-gold hover:text-ink hover:scale-110 shadow-md"
                        aria-label="Foto siguiente"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    )}

                    {/* Indicadores de puntos (carrusel de Instagram) */}
                    <div className="absolute bottom-3 inset-x-0 z-10 flex justify-center gap-1.5">
                      {post.images.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndexes((prev) => ({ ...prev, [post.id]: dotIdx }));
                          }}
                          className={`size-1.5 rounded-full transition-all duration-300 ${
                            dotIdx === currentImgIdx
                              ? "w-4 bg-gold shadow-sm"
                              : "bg-cream/40 hover:bg-cream/70"
                          }`}
                          aria-label={`Ir a foto ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Cuerpo del Post con la descripción oficial proporcionada */}
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      {/* Título del Post */}
                      <h3 className="font-display text-base font-bold text-cream flex items-center justify-between">
                        <span>{post.title}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold/80">
                          {totalImages} fotos
                        </span>
                      </h3>

                      {/* Texto con la descripción exacta */}
                      <p className="mt-3 text-xs leading-relaxed text-cream/80 whitespace-pre-line">
                        {post.caption}
                      </p>
                    </div>

                    {/* Botón de acción */}
                    <div className="mt-5 border-t border-cream/8 pt-3.5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => openModal(post, currentImgIdx)}
                        className="text-xs font-bold text-gold transition-colors hover:text-gold-light cursor-pointer"
                      >
                        Ver fotos ampliadas
                      </button>

                      <a
                        href={LINKS.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-cream/60 transition-colors hover:text-gold"
                      >
                        <span>Instagram</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Botón CTA general de Instagram */}
        <Reveal delay={150} className="mt-12 text-center">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_12px_40px_-10px_rgba(253,29,29,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_-10px_rgba(253,29,29,0.7)]"
          >
            <InstagramIcon className="size-4.5" />
            <span>Seguinos en Instagram @filipocaferesto</span>
            <ExternalLink className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      {/* Visor Modal Lightbox del carrusel */}
      {modalPost && (
        <div
          className="backdrop-in fixed inset-0 z-[80] flex items-center justify-center bg-coal/90 p-4 backdrop-blur-md"
          onClick={() => setModalPost(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modalPost.title}
        >
          {/* Botón foto anterior */}
          {modalPost.images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setModalImageIndex((prev) => (prev - 1 + modalPost.images.length) % modalPost.images.length);
              }}
              className="absolute left-3 sm:left-6 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-graphite/85 text-cream transition-all hover:border-gold hover:bg-gold hover:text-ink hover:scale-110"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}

          {/* Botón foto siguiente */}
          {modalPost.images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setModalImageIndex((prev) => (prev + 1) % modalPost.images.length);
              }}
              className="absolute right-3 sm:right-6 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full border border-cream/20 bg-graphite/85 text-cream transition-all hover:border-gold hover:bg-gold hover:text-ink hover:scale-110"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="size-6" />
            </button>
          )}

          {/* Contenedor del Post en el Modal */}
          <div
            className="modal-in relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-gold/30 bg-graphite shadow-2xl md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={() => setModalPost(null)}
              className="absolute top-3 right-3 z-20 flex size-9 cursor-pointer items-center justify-center rounded-full bg-coal/80 text-cream transition-colors hover:bg-gold hover:text-ink"
              aria-label="Cerrar visor"
            >
              <X className="size-4" />
            </button>

            {/* Imagen activa en grande */}
            <div className="relative flex flex-1 items-center justify-center bg-coal">
              <img
                src={modalPost.images[modalImageIndex]}
                alt={`${modalPost.title} - foto ${modalImageIndex + 1}`}
                className="max-h-[50vh] md:max-h-[82vh] w-full object-contain"
              />

              {/* Indicador de número de foto */}
              <span className="absolute bottom-3 left-3 rounded-full bg-coal/80 px-2.5 py-1 text-[10px] font-bold text-cream backdrop-blur-md border border-cream/15">
                Foto {modalImageIndex + 1} de {modalPost.images.length}
              </span>
            </div>

            {/* Panel lateral estilo Instagram */}
            <div className="flex w-full md:w-80 shrink-0 flex-col justify-between border-t border-cream/10 bg-graphite p-5 md:border-t-0 md:border-l overflow-y-auto max-h-[40vh] md:max-h-[82vh]">
              <div>
                {/* Encabezado del perfil */}
                <div className="flex items-center gap-3 border-b border-cream/10 pb-4">
                  {LOGO ? (
                    <img
                      src={LOGO}
                      alt="Filipo"
                      className="size-10 rounded-full border border-gold/50 object-contain p-0.5"
                    />
                  ) : (
                    <span className="flex size-10 items-center justify-center rounded-full border border-gold/50 bg-gold/15 font-display text-sm font-bold text-gold">
                      F
                    </span>
                  )}
                  <div>
                    <h4 className="font-bold text-xs text-cream flex items-center gap-1.5">
                      filipocaferesto
                      <span className="size-1.5 rounded-full bg-gold" />
                    </h4>
                    <p className="text-[10px] text-cream/50">{modalPost.location}</p>
                  </div>
                </div>

                {/* Título y descripción oficial */}
                <div className="mt-4">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      modalPost.id === "post-combos" || modalPost.id === "post-wraps"
                        ? "border border-mint/40 bg-mint/10 text-mint"
                        : "border border-gold/30 bg-gold/10 text-gold"
                    }`}
                  >
                    {modalPost.tag}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-cream">
                    {modalPost.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-cream/80 whitespace-pre-line">
                    {modalPost.caption}
                  </p>
                </div>
              </div>

              {/* Pie con selector de miniaturas y botón directo */}
              <div className="mt-6 border-t border-cream/10 pt-4">
                {/* Miniaturas */}
                <div className="flex items-center gap-2 mb-4">
                  {modalPost.images.map((thumb, tIdx) => (
                    <button
                      key={tIdx}
                      type="button"
                      onClick={() => setModalImageIndex(tIdx)}
                      className={`relative size-11 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        tIdx === modalImageIndex
                          ? "border-gold scale-105 shadow-md"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={thumb} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:opacity-95"
                >
                  <InstagramIcon className="size-4" />
                  Ver en Instagram
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hairline absolute inset-x-0 bottom-0" aria-hidden="true" />
    </section>
  );
}
