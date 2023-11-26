import React, { useLayoutEffect } from 'react'
// var
import 'vditor/dist/index.css'
import { initVditor, setVditorTheme } from './utils/vditor'


const prefixId = 'vditor'

interface Props {
  fileId: string; // For file caching
}

const Index: React.FC<Props> = (props) => {
  const { fileId } = props

  useLayoutEffect(() => {
    if (fileId) {
      initVditor(prefixId, fileId).then(vditor => {
        vditor = setVditorTheme(vditor, 'dark')
        window.vditor = vditor
      })
    }
  }, [fileId])

  return (
    <div id="vditor" />
  )
}

export default Index
