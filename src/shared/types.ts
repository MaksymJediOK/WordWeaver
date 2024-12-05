export type BaseWord = {
  id: number
  originalWord: string
  translatedWord: string
  example: string
  translatedExample: string
}

export type PaginationProps = {
  page: number,
  size: number
}

export type FetchState = {
  words: BaseWord[]
  count: number
}
