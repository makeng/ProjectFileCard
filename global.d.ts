import { ElectronAPI } from './electron/types'
import Vditor from 'vditor'

declare  global {
  type Obj = Record<PropertyKey, any>
  type valueOf<T> = T[keyof T];

  interface Window {
    main: ElectronAPI;
    vditor: Vditor
  }
}
