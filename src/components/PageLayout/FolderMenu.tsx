import React, { memo, ReactNode } from 'react'
import { Tree } from '@arco-design/web-react'
import { ConfigProviderProps } from '../config'
import {
  IconCode, IconCodeBlock, IconCommon, IconDriveFile, IconFilePdf, IconFolder
} from '@arco-design/web-react/icon'
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

const IGNORE_FILES_SUFFIX = ['.log', '.lock']

function findIconByName(fileName: string) {
  const fileNameList = fileName.split('.')
  fileNameList.shift()
  const targetSuffix = fileNameList.join('.')
  const suffixToIconList = [
    { suffix: ['ts', 'js'], icon: <IconCode /> },
    { suffix: ['json'], icon: <IconCodeBlock /> },
    { suffix: ['md', 'doc'], icon: <IconFilePdf /> },
    { suffix: ['config.json', 'config.js','d.ts'], icon: <IconCommon /> },
  ]
  const res = suffixToIconList.find(({ suffix }) => suffix.some(name => targetSuffix === name))
  return res?.icon || <IconDriveFile />
}

function fileListToTree(fileList: Obj[]) {
  const importantFiles = fileList.filter(item => !item.name.startsWith('.')) // Only the important file
  const folders = importantFiles.filter(item => item.isDirectory)
  const otherFiles = importantFiles.filter(item =>
    !item.isDirectory &&
    !IGNORE_FILES_SUFFIX.some(suffix => item.name.endsWith(suffix))
  )

  const foldersTree = folders.map(item => createTreeNode(item, <IconFolder />))
  const codeFilesTree = otherFiles.map(item => createTreeNode(item, findIconByName(item.name)))
  return foldersTree.concat(codeFilesTree)
}

export default memo(Index)
