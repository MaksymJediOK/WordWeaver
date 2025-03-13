import { supportedLanguages } from './mocks'

export const hasMoreThanOneWord = (str: string): boolean => /\S+\s+\S+/.test(str)

export const languageSelectOptions = supportedLanguages.map((lang) => {
  const initials = lang.split(' - ')[0].toLowerCase().trim()
  const fullName = lang.split(' - ')[1].trim()
  return {
    initials,
    fullName
  }
})
