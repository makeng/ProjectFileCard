import React from 'react'

const IGNORE_FILES_SUFFIX = ['.log', '.lock']

function createTreeNode(file: Obj, isLeaf: boolean): Obj {
  const { name: title } = file
  return {
    title,
    isLeaf,
    ...file
  }
}

/**
 * Create a file tree recursively
 * @param fileList
 * @param isLeaf
 */
export function listToNodes(fileList: Obj[], isLeaf = false) {
  const importantFiles = fileList.filter(item => !item.name.startsWith('.')) // Only the important file
  const folders = importantFiles.filter(item => item.isDirectory)
  const otherFiles = importantFiles.filter(item =>
    !item.isDirectory &&
    !IGNORE_FILES_SUFFIX.some(suffix => item.name.endsWith(suffix))
  )

  const foldersTree = folders.map(item => createTreeNode(item, isLeaf))
  const codeFilesTree = otherFiles.map(item => createTreeNode(item, isLeaf))
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
