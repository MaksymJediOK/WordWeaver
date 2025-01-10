export type BaseWord = {
  id: number
  originalWord: string
  translatedWord: string
  example: string
  translatedExample: string
}

export type PaginationProps = {
  page: number
  size: number
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
  table = 'Table'
}
