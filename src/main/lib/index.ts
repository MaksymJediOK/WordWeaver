import * as deepl from 'deepl-node'
import { hasMoreThanOneWord } from '@shared/helpers'
import { PrismaClient } from '@prisma/client'
import { ExamplesApiResponse, PaginationProps, BaseWord, UserConfig } from '@shared/types'
import { SourceLanguageCode, TargetLanguageCode } from 'deepl-node'

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
let cachedConfig: UserConfig | null = null

const addWordViaString = async (baseWord: string, context?: string) => {
  const config = await getUserConf()
  let exampleSentence = '-'
  let translatedSentence: deepl.TextResult | null = null

  if (!config) throw new Error('User config not found')
  const translatedBaseWord = await translator.translateText(
    baseWord,
    config.fromLang as SourceLanguageCode,
    config.toLang as TargetLanguageCode,
    { context }
  )

  if (config.fromLang.startsWith('en')) {
    exampleSentence = await findExampleUsage(baseWord)
    translatedSentence = await translator.translateText(
      exampleSentence,
      config.fromLang as SourceLanguageCode,
      config.toLang as TargetLanguageCode
    )
  }

  return prisma.word.create({
    data: {
      originalWord: baseWord,
      translatedWord: translatedBaseWord.text,
      example: exampleSentence,
      translatedExample: translatedSentence?.text || '-'
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
  page
}: PaginationProps): Promise<{ data: BaseWord[]; totalCount: number }> => {
  const config = await getUserConf()
  if (!config) throw new Error('User config not found')
  const skip = (page - 1) * config.wordsPerPage
  const take = config.wordsPerPage

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

const getUserConf = async () => {
  if (cachedConfig) return cachedConfig

  const config = await prisma.userConfig.findFirst({
    select: {
      fromLang: true,
      toLang: true,
      wordsPerPage: true
    }
  })
  if (config) cachedConfig = config

  return config
}
const editUserConfig = async (conf: UserConfig) => {
  cachedConfig = null
  return prisma.userConfig.update({
    where: {
      id: 1
    },
    data: {
      ...conf
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
  editTranslatedExample,
  getUserConf,
  editUserConfig
}
