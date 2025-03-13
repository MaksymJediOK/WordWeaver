export type BaseWord = {
  id: number
  originalWord: string
  translatedWord: string
  example: string
  translatedExample: string
}

//remove later
export type PaginationProps = {
  page: number
}

export type FetchState = {
  words: BaseWord[]
  count: number
}

export type ExamplesApiResponse = {
  examples: {
    provider: {
      id: number
    }
    year: number
    rating: number
    url: string
    word: string
    text: string
    documentId: number
    exampleId: number
    title: string
  }[]
}

export enum CurrentPageName {
  manual = 'Manual',
  table = 'Table',
  config = 'Config'
}

export type UserConfig = {
  wordsPerPage: number
  fromLang: string
  toLang: string
}
