import React, { memo } from 'react'
import { Tree } from '@arco-design/web-react'
import { ConfigProviderProps } from '../config'
import { listToNodes } from './utils/file'
import { useDebounceEffect, useLocalStorageState, usePrevious } from 'ahooks'
import { sleep } from 'ahooks/es/utils/testingHelpers'
import { GlobalStorageKey } from '../../utils/storage'
import { removeIconRecursively, setIconRecursively } from './utils'
import { isEqual, size } from 'lodash'

interface Props extends ConfigProviderProps {
  fileList: Obj[]
  onSelectItem(path: string): void;
}

const WAIT_TO_READ_STORAGE = 50

const Index: React.FC<Props> = (props) => {
  const { fileList, } = props
  const [tree = [], setTree] = useLocalStorageState<Obj[]>(GlobalStorageKey.PRJ_FILE_TREE, {
    // Couldn't be store in localStorage becaust of the icon node
    serializer: (value) => JSON.stringify(removeIconRecursively(value))
  })
  const [expandedFolders = [], setExpandedKeys] = useLocalStorageState<string[]>(GlobalStorageKey.PRJ_FILE_EXPENDEDS)
  const previousFileList = usePrevious(fileList)

  useDebounceEffect(() => {
    // If folder is changed
    if (size(previousFileList) && !isEqual(previousFileList, fileList)) {
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
    if (item.isDirectory) {
      if (!size(item.children)) {
        const sutItems = await window.main.enumFiles(item.path)
        item.dataRef.children = listToNodes(sutItems || [], true)

        setTree([...tree])
        sleep(WAIT_TO_READ_STORAGE).then(() => toggleSelectedFolder(key)) // Wait for tree to be stable
      }
    } else {
      props.onSelectItem(item.path)
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
