/*----------------------------------------------------------------------------------
* desc: Config for project
* ----------------------------------------------------------------------------------*/
import { GlobalStorageKey, StorageSpace } from '../utils/storage'
import { SelectFolderResult } from '../../electron/preload/types'

export const localPrjFileTree = new StorageSpace<Obj[]>(GlobalStorageKey.PRJ_FILE_TREE)
