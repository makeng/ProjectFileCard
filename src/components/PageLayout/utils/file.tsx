import React, { ReactNode } from 'react'
import {
  IconCode, IconCodeBlock, IconCommon, IconDriveFile, IconFilePdf, IconFolder
} from '@arco-design/web-react/icon'

const IGNORE_FOLDERS = ['node_modules']
const IGNORE_FILES_SUFFIX = ['.log', '.lock']

function createTreeNode(file: Obj, icon: ReactNode): Obj {
  const { name: title, path } = file
  return {
    title,
    key: path,
    icon,
    ...file
  }
}

/**
 * Get an icon by filename
 * @param filename
 */
export function findIconByName(filename: string) {
  const fileNameList = filename.split('.')
  fileNameList.shift()
  const targetSuffix = fileNameList.join('.')
  const suffixToIconList = [
    { suffix: ['ts', 'js'], icon: <IconCode /> },
    { suffix: ['json'], icon: <IconCodeBlock /> },
    { suffix: ['md', 'doc'], icon: <IconFilePdf /> },
    { suffix: ['config.json', 'config.js', 'd.ts'], icon: <IconCommon /> },
  ]
  const res = suffixToIconList.find(({ suffix }) => suffix.some(name => targetSuffix === name))
  return res?.icon || <IconDriveFile />
}

/**
 * Create a file tree recursively
 * @param fileList
 */
export function fileListToTree(fileList: Obj[]) {
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

export function fileTreeRecursion(list: Obj[]) {
  return new Promise(resolve => {
    const tree: Obj[] = []
    list.forEach(async item => {
      if (item.isDirectory && !IGNORE_FOLDERS.includes(item.name)) {
        const sutItems = await window.main.enumFiles(item.path)
        item.children = fileListToTree(sutItems) || []
      }
      tree.unshift(item)

      if (tree.length === list.length) {
        resolve(tree)
      }
    })
  })
}
