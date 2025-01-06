import * as deepl from 'deepl-node'
import { hasMoreThanOneWord } from '@shared/helpers'
import { PrismaClient } from '@prisma/client'
import { ExamplesApiResponse, PaginationProps, BaseWord } from '@shared/types'

const authKey = 'key'
const wordnikKey = 'key'

const prisma = new PrismaClient()
const translator = new deepl.Translator(authKey)

const addWordViaString = async (baseWord: string, context?: string) => {
  const translatedBaseWord = await translator.translateText(baseWord, 'en', 'uk', { context })

  const exampleSentence = await findExampleUsage(baseWord)
  const translatedSentence = await translator.translateText(exampleSentence, 'en', 'uk')

  return prisma.word.create({
    data: {
      originalWord: baseWord,
      translatedWord: translatedBaseWord.text,
      example: exampleSentence,
      translatedExample: translatedSentence.text
    }
  })
}

const removeWord = async (id: number) => {
  await prisma.word.delete({
    where: {
      id
    }
  })
}
const findExampleUsage = async (word: string, limit = 1) => {
  if (hasMoreThanOneWord(word)) return 'Empty'

  const url = `https://api.wordnik.com/v4/word.json/${word}/examples?includeDuplicates=false&useCanonical=true&limit=${limit}&api_key=${wordnikKey}`
  const response = await fetch(url)
  const textData: ExamplesApiResponse = await response.json()
  return textData.examples[0].text
}

const getByPage = async ({
  page,
  size = 10
}: PaginationProps): Promise<{ data: BaseWord[], totalCount: number }> => {
  const skip = (page - 1) * size
  const take = size

  const [data, totalCount] = await Promise.all([
    prisma.word.findMany({
      skip,
      take
    }),
    prisma.word.count()
  ])

  return { data, totalCount }
}

const createManually = async (values: Omit<BaseWord, 'id'>) => {
  return prisma.word.create({
    data: { ...values }
  })
}

export { addWordViaString, removeWord, getByPage, createManually }
