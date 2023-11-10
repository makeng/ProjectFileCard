import React, { memo, useEffect, useState } from 'react'
import { Tree } from '@arco-design/web-react'
import { ConfigProviderProps } from '../config'
import { fileListToTree, fileTreeRecursion } from './utils/file'

interface Props extends ConfigProviderProps {
  fileList: Obj[]
}

const Index: React.FC<Props> = (props) => {
  const { fileList, } = props
  const [tree, setTree] = useState([])


  useEffect(() => {
    const fileTree = fileListToTree(fileList)
    fileTreeRecursion(fileTree).then(setTree)
  }, [fileList])

  return (
    <Tree treeData={tree} />
  )
}

export default memo(Index)
