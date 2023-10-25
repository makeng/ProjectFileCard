import { onEnumFiles, onOpenFile, onSelectFolder } from './file'
import { ipcMain } from 'electron'
import { IPCKeyOfFile } from '../../electron/preload/types'

let initialized = false

// All the events define here.
const eventMap = new Map([
  [IPCKeyOfFile.SelectFolder, onSelectFolder],
  [IPCKeyOfFile.EnumItems, onEnumFiles],
  [IPCKeyOfFile.OpenItem, onOpenFile]
])

/**
 * Initialize IPC events.
 */
export function initializeIpcEvents() {
  if (initialized) {
    return
  }
  initialized = true

  for (const [key, event] of eventMap) {
    ipcMain.handle(key, event)
  }
}

export function releaseIpcEvents() {
  for (const [key] of eventMap) {
    ipcMain.removeAllListeners(key)
  }
}
