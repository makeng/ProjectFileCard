import React, { ReactNode } from 'react'
import {
  IconBgColors, IconCode, IconCodeBlock, IconCommon, IconDriveFile, IconFilePdf, IconFolder
} from '@arco-design/web-react/icon'

const IGNORE_FILES_SUFFIX = ['.log', '.lock']

function createTreeNode(file: Obj, icon: ReactNode, isLeaf: boolean): Obj {
  const { name: title } = file
  return {
    title,
    icon,
    isLeaf,
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
    { suffix: ['ts', 'js', 'tsx', 'jsx'], icon: <IconCode /> },
    { suffix: ['css', 'scss', 'sass', 'less'], icon: <IconBgColors /> },
    { suffix: ['json'], icon: <IconCodeBlock /> },
    { suffix: ['md', 'doc'], icon: <IconFilePdf /> },
    { suffix: ['config.json', 'config.ts', 'config.js', 'd.ts'], icon: <IconCommon /> },
  ]
  const res = suffixToIconList.find(({ suffix }) => suffix.some(name => targetSuffix === name))
  return res?.icon || <IconDriveFile />
}

/**
 * Create a file tree recursively
 * @param fileList
 */
export function listToNodes(fileList: Obj[], isLeaf = false) {
  const importantFiles = fileList.filter(item => !item.name.startsWith('.')) // Only the important file
  const folders = importantFiles.filter(item => item.isDirectory)
  const otherFiles = importantFiles.filter(item =>
    !item.isDirectory &&
    !IGNORE_FILES_SUFFIX.some(suffix => item.name.endsWith(suffix))
  )

  const foldersTree = folders.map(item => createTreeNode(item, <IconFolder />, isLeaf))
  const codeFilesTree = otherFiles.map(item => createTreeNode(item, findIconByName(item.name)), isLeaf)
  return foldersTree.concat(codeFilesTree)
}

export function fileTreeRecursion(list: Obj[]): Promise<Obj[]> {
  return new Promise(resolve => {
    const tree: Obj[] = []
    list.forEach(async item => {
      if (item.isDirectory) {
        const sutItems = await window.main.enumFiles(item.path)
        const subTree = await fileTreeRecursion(sutItems)
        item.children = listToNodes(subTree) || []
      }
      tree.unshift(item)

      if (tree.length === list.length) {
        resolve(tree)
      }
    })
  })
}
