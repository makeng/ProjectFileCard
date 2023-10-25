import { ipcRenderer } from 'electron'
import { FileItem, IPCKeyOfFile, SelectFolderResult } from './types'

export const fileApi = {
  selectFolder: (): Promise<SelectFolderResult | undefined> =>
    ipcRenderer.invoke(IPCKeyOfFile.SelectFolder),

  enumFiles: (folderPath: string): Promise<FileItem[]> =>
    ipcRenderer.invoke(IPCKeyOfFile.EnumItems, folderPath),

  openFile: (itemPath: string): Promise<string> =>
    ipcRenderer.invoke(IPCKeyOfFile.OpenItem, itemPath)
}
