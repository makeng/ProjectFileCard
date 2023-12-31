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
    return { name: Path.basename(folderPath), folderPath, items }
  }

  return dialog.showOpenDialog(win, {
    title: 'Select root folder',
    properties: ['openDirectory']
  }).then(dialogCb)
}

/**
 * Occurs when an item enumeration in the folder is requested.
 * @param _ev
 * @param folderPath Path of the target folder.
 */
export function onEnumFiles(_ev: IpcMainInvokeEvent, folderPath: string) {
  return enumFiles(folderPath)
}

export function onOpenFile() {}
