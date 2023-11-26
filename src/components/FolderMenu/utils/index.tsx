import {
  IconBgColors, IconCode, IconCodeBlock, IconCommon, IconDriveFile, IconFilePdf, IconFolder, IconImage
} from '@arco-design/web-react/icon'
import React from 'react'
import { TreeDataType } from '@arco-design/web-react/es/Tree/interface'

/**
 * Get an icon by filename
 * @param filename
 */
function findIconByName(filename: string) {
  const fileNameList = filename.split('.')
  fileNameList.shift()
  const targetSuffix = fileNameList.join('.')
  const suffixToIconList = [
    { suffix: ['ts', 'js', 'tsx', 'jsx'], icon: <IconCode /> },
    { suffix: ['css', 'scss', 'sass', 'less'], icon: <IconBgColors /> },
    { suffix: ['json'], icon: <IconCodeBlock /> },
    { suffix: ['md', 'doc'], icon: <IconFilePdf /> },
    { suffix: ['png', 'jpg', 'jpeg', 'svg'], icon: <IconImage /> },
    { suffix: ['config.json', 'config.ts', 'config.js', 'd.ts'], icon: <IconCommon /> },
  ]

  if (targetSuffix) {
    const res = suffixToIconList.find(({ suffix }) => suffix.some(name => targetSuffix === name))
    return res?.icon || <IconDriveFile />
  }
  // Folder
  return <IconFolder />
}

/**
 * Add an icon to nodes and their children
 * @param nodeList
 */
export function setIconRecursively(nodeList: TreeDataType[]) {
  return nodeList.map(item => {
    item.icon = findIconByName(item.name)
    if (item.children?.length) {
      item.children = setIconRecursively(item.children)
    }
    return item
  })
}


/**
 * Remove the icon of nodes and their children. Or localStorage can't cache them.
 * @param nodeList
 */
export function removeIconRecursively(nodeList: TreeDataType[]) {
  return nodeList.map(item => {
    item.icon = ''
    if (item.children?.length) {
      item.children = removeIconRecursively(item.children)
    }
    return item
  })
}
