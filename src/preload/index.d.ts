import { ElectronAPI } from '@electron-toolkit/preload'
import { BaseWord } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getWords(): Promise<BaseWord[] | null>
      addWord(word: string): Promise<void>
      removeWord(id: number): Promise<void>
    }
  }
}
