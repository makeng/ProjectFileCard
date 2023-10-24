/**
 * The key name that is the channel of the IPC message..
 */
export enum IPCKeyOfFile {
  SelectFolder = 'SelectFolder',
  EnumItems = 'EnumItems',
  OpenItem = 'OpenItem'
}

/** File or Folder information. */
export interface FileItem {
  /** Name of the item. */
  name: string
  /** Path of the item. */
  path: string
  /** File size of the item. */
  size: number
  /** Permission of the item. */
  mode: number
  /** Make time of the item. */
  mtime: string
  /** `true` if the item is a directory. */
  isDirectory: boolean
}

/** Result values of SelectFolder API. */
export interface SelectFolderResult {
  /** Name of the selected folder. */
  name: string
  /** Path of the selected folder. */
  folderPath: string
  /** Items on the selected folder. */
  items: FileItem[]
}

