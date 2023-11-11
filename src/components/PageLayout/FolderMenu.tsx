import React, { memo, useState } from 'react'
import { Tree } from '@arco-design/web-react'
import { ConfigProviderProps } from '../config'
import { listToNodes } from './utils/file'
import { useDebounceEffect } from 'ahooks'

interface Props extends ConfigProviderProps {
  fileList: Obj[]
}

const WAIT_TO_READ_STORAGE = 20

const Index: React.FC<Props> = (props) => {
  const { fileList, } = props
  const [tree, setTree] = useState<Obj[]>([])
  const [expandedFolders, setExpandedKeys] = useState<string[]>([])

  useDebounceEffect(() => {
    const fileTree = listToNodes(fileList, true)
    setTree(fileTree)
  }, [fileList], { wait: WAIT_TO_READ_STORAGE })

  async function selectFile(selectedkeys: string[], extra: Obj) {
    const { node } = extra as Obj
    const { props } = node
    const [key] = selectedkeys
    // If node is a folder, expend it
    if (props.isDirectory) {
      const sutItems = await window.main.enumFiles(props.path)
      props.dataRef.children = listToNodes(sutItems || [], true)
      toggleSelectedFolder(key)
    }

    setTree([...tree])
  }

  function toggleSelectedFolder(key: string) {
    const nextExpandedFolders = expandedFolders.includes(key)
      ? expandedFolders.filter(expendedKey => expendedKey !== key)
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
