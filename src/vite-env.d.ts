/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WA_NUMBER?: string;
  readonly VITE_MENU_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_PEYA_TABLAS_URL?: string;
  readonly VITE_PEYA_COFFE_URL?: string;
  readonly VITE_MAPS_URL?: string;
  readonly VITE_MAPS_EMBED_URL?: string;
  readonly VITE_GOOGLE_RATING?: string;
  readonly VITE_GOOGLE_REVIEWS_COUNT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
