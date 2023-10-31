import { onEnumFiles, onOpenFile, onSelectFolder } from './file'
import { ipcMain } from 'electron'
import { IPCKeyOfFile } from '../../electron/preload/types'

// All the events define here.
const eventMap = new Map<IPCKeyOfFile, (...args: any) => any>([
  [IPCKeyOfFile.SelectFolder, onSelectFolder],
  [IPCKeyOfFile.EnumItems, onEnumFiles],
  [IPCKeyOfFile.OpenItem, onOpenFile]
])

/**
 * Initialize IPC events.
 */
export function initializeIpcEvents() {
  if (initializeIpcEvents.invoked) {
    return
  }
  initializeIpcEvents.invoked = true

  for (const [key, event] of eventMap) {
    ipcMain.handle(key, event)
  }
}

export function releaseIpcEvents() {
  for (const [key] of eventMap) {
    ipcMain.removeAllListeners(key)
  }
}
initializeIpcEvents.invoked = false
