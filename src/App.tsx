import React, { useEffect } from 'react'
import { PageLayout } from './components'
import { Button } from '@arco-design/web-react'
import '@arco-design/web-react/dist/css/arco.css'
import { SelectFolderResult } from '../electron/preload/types'
import { useWillMount } from '@better-hooks/lifecycle'
import { useLocalStorageState } from 'ahooks'
import { GlobalStorageKey } from './utils/storage'


function App() {
  const [prjFolder, setTargetPrjFolder] = useLocalStorageState<SelectFolderResult>(GlobalStorageKey.PRJ_FOLDER)

  useWillMount(() => {
    document.body.setAttribute('arco-theme', 'dark')
  })

  useEffect(() => {
    if (!prjFolder) {
      window.main.selectFolder().then(folder => {
        setTargetPrjFolder(folder)
      })
    }
  }, [])

  console.log({prjFolder})

  return (
    <PageLayout
      className="bg-slate-900	h-screen flex flex-col overflow-hidden"
      title={prjFolder?.name}
      fileList={prjFolder?.items || []}
      content={<Button type="primary">Primary</Button>}
      footer={4}
    />
  )
}

export default App
