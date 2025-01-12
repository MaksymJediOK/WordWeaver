import { app, shell, BrowserWindow, ipcMain, globalShortcut, clipboard } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { BaseWord } from '@shared/types'
import {
  addWordViaString,
  removeWord,
  getByPage,
  createManually,
  editTranslatedWord,
  editOriginalWord,
  editExample,
  editTranslatedExample
} from './lib'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    center: true,
    title: 'Dictionary',
    trafficLightPosition: { x: 15, y: 10 },
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // mainWindow.on('minimize', () => {
  //   mainWindow.hide()
  // });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // mainWindow.on('close', (event) => {
  //   if (!app.quit) {
  //     event.preventDefault();
  //     mainWindow.hide(); // Hide the window when the user tries to close
  //   }
  //   return false;
  // });
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  // const icon = nativeImage.createFromPath('../../resources/icon.png?asset')
  // tray = new Tray(icon)
  //
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Item1', type: '' },
  //   { label: 'Item2', type: 'radio' },
  //
  // ])

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  globalShortcut.register('Control+Q', () => {
    const text = clipboard.readText()
    addWordViaString(text)
  })
  ipcMain.handle('add-word', (_, word: string, context?: string) => addWordViaString(word, context))
  ipcMain.handle('remove-word', (_, id: number) => removeWord(id))
  ipcMain.handle('get-by-page', (_, page: number, size: number) => getByPage({ page, size }))
  ipcMain.handle('create-manually', (_, data: Omit<BaseWord, 'id'>) => createManually(data))
  ipcMain.handle('edit-word', (_, id: number, text: string) => editOriginalWord(id, text))
  ipcMain.handle('edit-translated', (_, id: number, text: string) => editTranslatedWord(id, text))
  ipcMain.handle('edit-example', (_, id: number, text: string) => editExample(id, text))
  ipcMain.handle('edit-translated-example', (_, id: number, text: string) =>
    editTranslatedExample(id, text)
  )

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    globalShortcut.unregisterAll()
    app.quit()
  }
})
