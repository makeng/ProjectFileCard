import React, { useEffect, useState } from 'react'
import { PageLayout } from './components'
import { Button } from '@arco-design/web-react'
import '@arco-design/web-react/dist/css/arco.css'
import { localPrjFolder } from './system/prj'
import { SelectFolderResult } from '../electron/preload/types'
import { useWillMount } from '@better-hooks/lifecycle'


function App() {
  const [targetPrjFolder, setTargetPrjFolder] = useState<SelectFolderResult>()

  useWillMount(() => {
    document.body.setAttribute('arco-theme', 'dark')
  })

  useEffect(() => {
    const prjFolder = localPrjFolder.get()
    if (!prjFolder) {
      window.main.selectFolder().then(folder => {
        localPrjFolder.set(folder)
        setTargetPrjFolder(folder)
      })
    } else {
      setTargetPrjFolder(prjFolder)
    }
  }, [])

  console.log(targetPrjFolder)

  return (
    <PageLayout
      className="bg-slate-900	h-screen flex flex-col"
      title={targetPrjFolder?.name}
      fileList={targetPrjFolder?.items || []}
      content={<Button type="primary">Primary</Button>}
      footer={4}
    />
  )
}

export default App
