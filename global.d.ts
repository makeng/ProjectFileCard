import { ElectronAPI } from './electron/types'
import Vditor from 'vditor'

declare  global {
  type Obj = Record<PropertyKey, any>

  interface Window {
    main: ElectronAPI;
    vditor: Vditor
  }
}
