import React, { useEffect, useState } from 'react'
import { FolderMenu, MdEditor, PageLayout } from './components'
import '@arco-design/web-react/dist/css/arco.css'
import { SelectFolderResult } from '../electron/preload/types'
import { useWillMount } from '@better-hooks/lifecycle'
import { useLocalStorageState } from 'ahooks'
import { GlobalStorageKey } from './utils/storage'


function App() {
  const [prjFolder, setTargetPrjFolder] = useLocalStorageState<SelectFolderResult>(GlobalStorageKey.PRJ_FOLDER)
  const [fileId, setFileId] = useState<string>('')

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

  function selectItem(nextFileId: string) {
    setFileId(nextFileId)
  }

  return (
    <PageLayout
      className="bg-slate-900	h-screen flex flex-col overflow-hidden"
      title={prjFolder?.name}
      sider={<FolderMenu fileList={prjFolder?.items || []} onSelectItem={selectItem} />}
      content={<MdEditor fileId={fileId} />}
      footer={4}
    />
  )
}

export default App
