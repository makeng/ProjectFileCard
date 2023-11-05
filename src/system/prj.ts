/*----------------------------------------------------------------------------------
* desc: Config for project
* ----------------------------------------------------------------------------------*/
import { GlobalStorageKey, StorageSpace } from '../utils/storage'
import { SelectFolderResult } from '../../electron/preload/types'

export const localPrjFolder = new StorageSpace<SelectFolderResult>(GlobalStorageKey.PRJ_FOLDER)
