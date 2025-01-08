import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { BaseWord, PaginationProps } from '../shared/types'

const api = {
  addWord: (word: string, context?: string) => ipcRenderer.invoke('add-word', word, context),
  removeWord: (id: number) => ipcRenderer.invoke('remove-word', id),
  getByPage: ({ page, size }: PaginationProps) => ipcRenderer.invoke('get-by-page', page, size),
  createManually: (data: Omit<BaseWord, 'id'>) => ipcRenderer.invoke('create-manually', data),
  editOriginalWord: (id: number, text: string) => ipcRenderer.invoke('edit-word', id, text),
  editTranslatedWord: (id: number, text: string) => ipcRenderer.invoke('edit-translated', id, text),
  editExample: (id: number, text: string) => ipcRenderer.invoke('edit-example', id, text),
  editTranslatedExample: (id: number, text: string) =>
    ipcRenderer.invoke('edit-translated-example', id, text)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
