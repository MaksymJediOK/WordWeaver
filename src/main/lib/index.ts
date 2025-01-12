import * as deepl from 'deepl-node'
import { hasMoreThanOneWord } from '@shared/helpers'
import { PrismaClient } from '@prisma/client'
import { ExamplesApiResponse, PaginationProps, BaseWord } from '@shared/types'

const authKey = import.meta.env.MAIN_VITE_TRANSLATOR_KEY
const wordnikKey = import.meta.env.MAIN_VITE_WORD_KEY

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: import.meta.env.MAIN_VITE_DATABASE_URL
    }
  }
})
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
}: PaginationProps): Promise<{ data: BaseWord[]; totalCount: number }> => {
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

const editOriginalWord = async (id: number, text: string) => {
  return prisma.word.update({
    where: {
      id
    },
    data: {
      originalWord: text
    }
  })
}

const editTranslatedWord = async (id: number, text: string) => {
  return prisma.word.update({
    where: {
      id
    },
    data: {
      translatedWord: text
    }
  })
}
const editExample = async (id: number, text: string) => {
  return prisma.word.update({
    where: {
      id
    },
    data: {
      example: text
    }
  })
}
const editTranslatedExample = async (id: number, text: string) => {
  return prisma.word.update({
    where: {
      id
    },
    data: {
      translatedExample: text
    }
  })
}

export {
  addWordViaString,
  removeWord,
  getByPage,
  createManually,
  editOriginalWord,
  editTranslatedWord,
  editExample,
  editTranslatedExample
}
