import React, { memo, ReactNode } from 'react'
import { Tree } from '@arco-design/web-react'
import { ConfigProviderProps } from '../config'
import { IconCode, IconFolder } from '@arco-design/web-react/icon'
// var

interface Props extends ConfigProviderProps {
  fileList: Obj[]
}

const Index: React.FC<Props> = (props) => {
  const { fileList, } = props
  const fileTree = fileListToTree(fileList)

  return (
    <Tree treeData={fileTree} />
  )
}

function createTreeNode(file: Obj, icon: ReactNode) {
  const title = file.name
  return {
    title,
    key: title,
    icon
  }
}

function fileListToTree(fileList: Obj[]) {
  const importantFiles = fileList.filter(item => !item.name.startsWith('.')) // Only the important file
  const folders = importantFiles.filter(item => item.isDirectory)
  const codeFiles = importantFiles.filter(item => !item.isDirectory)

  const foldersTree = folders.map(item => createTreeNode(item, <IconFolder />))
  const codeFilesTree = codeFiles.map(item => createTreeNode(item, <IconCode />))
  return foldersTree.concat(codeFilesTree)
}

export default memo(Index)
