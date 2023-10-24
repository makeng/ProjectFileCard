import { contextBridge } from 'electron'
import { api as fileApi } from './file'

// All custom api
const electronApi = Object.assign(fileApi)

// Naming from https://www.electronjs.org/zh/docs/latest/api/context-bridge
contextBridge.exposeInMainWorld('electron', electronApi)
