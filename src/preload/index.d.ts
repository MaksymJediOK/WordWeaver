import { ElectronAPI } from '@electron-toolkit/preload'
import { BaseWord, PaginationProps } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getWords(): Promise<BaseWord[] | null>
      addWord(word: string, context?: string): Promise<void>
      removeWord(id: number): Promise<void>
      getByPage({ page, size }: PaginationProps): Promise<{ data: BaseWord[]; totalCount: number }>
    }
  }
}
