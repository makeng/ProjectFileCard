import { contextBridge } from 'electron'
import { fileApi } from './file'

// Naming from https://www.electronjs.org/zh/docs/latest/api/context-bridge
contextBridge.exposeInMainWorld('main', {
  ...fileApi
})
