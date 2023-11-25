import React, { useLayoutEffect } from 'react'
// var
import 'vditor/dist/index.css'
import { initVditor, setVditorTheme } from './utils/vditor'


const prefixId = 'vditor'

const Index: React.FC = () => {
  useLayoutEffect(() => {
    initVditor(prefixId).then(vditor => {
      vditor = setVditorTheme(vditor, 'dark')
      window.vditor = vditor
    })
  }, [])

  return (
    <div id="vditor">

    </div>
  )
}

export default Index
