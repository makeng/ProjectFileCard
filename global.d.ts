import { ElectronAPI } from './electron/types'

declare  global {
  interface Window {
    main: ElectronAPI;
  }
}
