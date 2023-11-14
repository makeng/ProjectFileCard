import React, { memo, useState } from 'react'
import { Tree } from '@arco-design/web-react'
import { ConfigProviderProps } from '../config'
import { listToNodes } from './utils/file'
import { useDebounceEffect, useLocalStorageState } from 'ahooks'
import { sleep } from 'ahooks/es/utils/testingHelpers'
import { GlobalStorageKey } from '../../utils/storage'
import { removeIconRecursively, setIconRecursively } from './utils'
import { size } from 'lodash'
import { localPrjFileTree } from '../../system/prj'

interface Props extends ConfigProviderProps {
  fileList: Obj[]
}

const WAIT_TO_READ_STORAGE = 50

const Index: React.FC<Props> = (props) => {
  const { fileList, } = props
  const [tree, setTree] = useState<Obj[]>([]) // Couldn't be store in localStorage becaust of the icon node
  const [expandedFolders = [], setExpandedKeys] = useLocalStorageState<string[]>(GlobalStorageKey.PRJ_FILE_EXPENDEDS)

  useDebounceEffect(() => {
    if (localPrjFileTree.get()) {
      const nextTree = localPrjFileTree.get()
      setTree(nextTree)
    } else {
      const nextTree = listToNodes(fileList, true)
      nextTree.map(async (item, index) => {
        if (item.isDirectory) {
          const sutItems = await window.main.enumFiles(item.path)
          item.children = listToNodes(sutItems || [], true)
          setTree([...nextTree])
        }
      })
    }
  }, [fileList], { wait: WAIT_TO_READ_STORAGE })

  async function selectFile(key: string, item: Obj) {
    // If node is a folder, expend it
    if (item.isDirectory && !size(item.children)) {
      const sutItems = await window.main.enumFiles(item.path)
      item.dataRef.children = listToNodes(sutItems || [], true)

      setTree([...tree])
      localPrjFileTree.set(removeIconRecursively(tree))
      sleep(WAIT_TO_READ_STORAGE).then(() => toggleSelectedFolder(key)) // Wait for tree to be stable
    }
  }

  function toggleSelectedFolder(key: string) {
    const nextExpandedFolders = expandedFolders.includes(key)
      ? expandedFolders.filter(expendedKey => !expendedKey.includes(key))
      : expandedFolders.concat([key])
    setExpandedKeys(nextExpandedFolders)
  }


  const treeData = setIconRecursively(tree)
  // Should render after data is loaded. Becaust the doc says that.
  return size(treeData) ? (
    <Tree
      treeData={treeData}
      autoExpandParent
      defaultSelectedKeys={expandedFolders.slice(expandedFolders.length - 1)}
      expandedKeys={expandedFolders}
      onSelect={(selectedKeys, extra) => selectFile(selectedKeys[0], extra.node.props)}
    />
  ) : null
}

export default memo(Index)
