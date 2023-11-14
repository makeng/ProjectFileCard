/* ---------------------------------------------------------------------------------------
 * about:本地存储相关功能
 * author:马兆铿（13790371603 810768333@qq.com）
 * date:2021-07-30
 * ---------------------------------------------------------------------------------------- */
import aes from 'crypto-js/aes'
import encUtf8 from 'crypto-js/enc-utf8'

/**
 * Make sure they won't have duplicate keys
 */
export enum GlobalStorageKey {
  PRJ_FOLDER = 'prj-folder',
  PRJ_FILE_TREE = 'prj-file-tree',
  PRJ_FILE_EXPENDEDS = 'prj-file-expendeds'
}

/**
 * 存储空间。它们都有相似的功能：存、取、清除。（from storage.js）
 * @param name
 */
export class StorageSpace<T> {
  readonly name: string
  readonly isEncrypt: boolean
  readonly cryptKey = 'ebx'
  /**
   * 创建
   * @param name
   * @param isEncrypt 是否加密
   */
  constructor(name: string, isEncrypt = false) {
    this.name = name
    this.isEncrypt = isEncrypt
  }
  get(): T | undefined {
    let res = localStorage.getItem(this.name) || ''
    if (this.isEncrypt) {
      res = aes.decrypt(res, this.cryptKey).toString(encUtf8)
    }
    try {
      res = JSON.parse(res)
    } catch {
    }
    return res
  }
  set(value: T): void {
    let valueStr = JSON.stringify(value)
    if (this.isEncrypt) {
      valueStr = aes.encrypt(valueStr, this.cryptKey).toString()
    }
    localStorage.setItem(this.name, valueStr)
  }
  remove(): void {
    localStorage.removeItem(this.name)
  }
}
