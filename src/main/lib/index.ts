import * as deepl from 'deepl-node'
import { createClient } from '@supabase/supabase-js'
import { BaseWord, PaginationProps } from '@shared/types'
import { hasMoreThanOneWord } from '@shared/helpers'
import { ExamplesApiResponse } from '@shared/types'

const url = 'db_url'
const key = 'token'
const authKey = 'deepl_key'
const wordnikKey = 'api_key'

const translator = new deepl.Translator(authKey)

const getWords = async (): Promise<BaseWord[] | null> => {
  const supabase = createClient(url, key)
  const { data, error } = await supabase.from('words').select()
  if (error) throw error
  return data
}

const getByPage = async ({
  page,
  size = 10
}: PaginationProps): Promise<{ data: BaseWord[]; totalCount: number }> => {
  const supabase = createClient(url, key)
  const from = (page - 1) * size
  const to = from + size - 1
  const { data, error, count } = await supabase
    .from('words')
    .select('*', { count: 'exact' })
    .range(from, to)
  if (error) throw new Error(error.message)
  return { data: data || [], totalCount: count || 0 }
}

const addWordViaString = async (baseWord: string, context?: string) => {
  const supabase = createClient(url, key)
  const translatedBaseWord = await translator.translateText(baseWord, 'en', 'uk', {
    context
  })

  const exampleSentence = await findExampleUsage(baseWord)
  const translatedSentence = await translator.translateText(exampleSentence, 'en', 'uk')
  const { error } = await supabase.from('words').insert({
    originalWord: baseWord,
    translatedWord: translatedBaseWord.text,
    example: exampleSentence,
    translatedExample: translatedSentence.text
  })
  if (error) throw error
}

const removeWord = async (id: number) => {
  const supabase = createClient(url, key)
  const { error } = await supabase.from('words').delete().eq('id', id)
  if (error) throw error
}

const findExampleUsage = async (word: string, limit = 1) => {
  if (hasMoreThanOneWord(word)) return 'Empty'

  const url = `https://api.wordnik.com/v4/word.json/${word}/examples?includeDuplicates=false&useCanonical=true&limit=${limit}&api_key=${wordnikKey}`
  const response = await fetch(url)
  const textData: ExamplesApiResponse = await response.json()
  return textData.examples[0].text
}

export { getWords, addWordViaString, removeWord, getByPage }
