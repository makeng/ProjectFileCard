import { BrowserWindow, dialog, IpcMainInvokeEvent } from 'electron'
import Path from 'path'
import { enumFiles } from './utils'

/**
 * Select a folder
 * @param ev
 */
export function onSelectFolder(ev: IpcMainInvokeEvent) {
  const win = BrowserWindow.fromWebContents(ev.sender)
  if (!win) {
    throw new Error('Message sender window does not exist')
  }

  /**
   * Handle the result inside a dialog
   * @param result
   */
  const dialogCb = async (result: Electron.OpenDialogReturnValue) => {
    if (!result?.filePaths?.length) {
      return
    }
    const folderPath = result.filePaths[0]
    const items = await enumFiles(folderPath)
    console.log('items', items)
    return { name: Path.basename(folderPath), folderPath, items }
  }
  dialog.showOpenDialog(win, {
    title: 'Select root folder',
    properties: ['openDirectory']
  }).then(dialogCb)
}

export function onEnumFiles() {}

export function onOpenFile() {}
