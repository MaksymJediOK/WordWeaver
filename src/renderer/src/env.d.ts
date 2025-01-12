/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_TRANSLATOR_KEY: string
  readonly MAIN_VITE_WORD_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
