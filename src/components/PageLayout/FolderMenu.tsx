import React from 'react'
import { Tree } from '@arco-design/web-react'
import { ConfigProviderProps } from '../config'
// var

const TreeNode = Tree.Node

interface Props extends ConfigProviderProps {
  folderList: Obj[]
}

const Index: React.FC<Props> = (props) => {
  const { folderList, } = props

  return (
    <Tree>
      <TreeNode title="Trunk" key="0-0">
        <TreeNode title="Branch 0-0-0" key="0-0-0" disabled>
          <TreeNode title="Leaf" key="0-0-0-0" />
          <TreeNode title="Leaf" key="0-0-0-1" />
        </TreeNode>
        <TreeNode title="Branch 0-0-1" key="0-0-1">
          <TreeNode title="Leaf" key="0-0-1-0" />
        </TreeNode>
      </TreeNode>
    </Tree>
  )
}

export default Index
