import React, { useLayoutEffect } from 'react'
// var
import 'vditor/dist/index.css'
import { initVditor } from './utils'


const prefixId = 'vditor'

const Index: React.FC = () => {
  useLayoutEffect(() => {
    window.vditor = initVditor(prefixId)
  })

  return (
    <div id="vditor">

    </div>
  )
}

export default Index
