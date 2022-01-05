import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import __basedir from '../basepath'

console.log(path.join(__basedir, __dirname, '../preload.ts'))

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__basedir, __dirname, '../main/preload.ts')
    }
  })

  win.loadFile(path.join(__basedir, __dirname, '../renderer/index.html'))
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})