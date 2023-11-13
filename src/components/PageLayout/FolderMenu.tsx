import React, { memo, useState } from 'react'
import { Tree } from '@arco-design/web-react'
import { ConfigProviderProps } from '../config'
import { listToNodes } from './utils/file'
import { useDebounceEffect, useLocalStorageState } from 'ahooks'
import { sleep } from 'ahooks/es/utils/testingHelpers'
import { GlobalStorageKey } from '../../utils/storage'

interface Props extends ConfigProviderProps {
  fileList: Obj[]
}

const WAIT_TO_READ_STORAGE = 20

const Index: React.FC<Props> = (props) => {
  const { fileList, } = props
  const [tree, setTree] = useState<Obj[]>([])
  const [expandedFolders = [], setExpandedKeys] = useLocalStorageState<string[]>(GlobalStorageKey.PRJ_FILE_EXPENDEDS)

  useDebounceEffect(() => {
    const nextTree = listToNodes(fileList, true)
    setTree(nextTree)
  }, [fileList], { wait: WAIT_TO_READ_STORAGE })

  async function selectFile(selectedkeys: string[], extra: Obj) {
    const { node } = extra as Obj
    const { props } = node
    const [key] = selectedkeys

    // If node is a folder, expend it
    if (props.isDirectory) {
      const sutItems = await window.main.enumFiles(props.path)
      props.dataRef.children = listToNodes(sutItems || [], true)
    }

    setTree([...tree])
    sleep(WAIT_TO_READ_STORAGE).then(() => toggleSelectedFolder(key)) // Wait for tree to be stable
  }

  function toggleSelectedFolder(key: string) {
    const nextExpandedFolders = expandedFolders.includes(key)
      ? expandedFolders.filter(expendedKey => !expendedKey.includes(key))
      : expandedFolders.concat([key])
    setExpandedKeys(nextExpandedFolders)
  }

  return (
    <Tree
      treeData={tree}
      expandedKeys={expandedFolders}
      onSelect={selectFile}
    />
  )
}

export default memo(Index)
