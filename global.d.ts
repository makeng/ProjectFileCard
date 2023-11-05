import { ElectronAPI } from './electron/types'

declare  global {
  type Obj = Record<PropertyKey, any>

  interface Window {
    main: ElectronAPI;
  }
}
