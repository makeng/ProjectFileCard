import { platform } from 'node:process'

export function isMac() {
  return platform === 'darwin'
}
