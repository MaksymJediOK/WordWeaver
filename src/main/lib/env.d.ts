/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_TRANSLATOR_KEY: string
  readonly MAIN_VITE_WORD_KEY: string
  readonly MAIN_VITE_DATABASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
