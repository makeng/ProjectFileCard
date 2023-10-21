import React from 'react'
import { PageLayout } from './components'
import { Button } from '@arco-design/web-react'
import '@arco-design/web-react/dist/css/arco.css'


function App() {
  console.log(window.ipcRenderer)
  
  return (
    <PageLayout
      header={1}
      sider={2}
      content={<Button type="primary">Primary</Button>}
      footer={4}
    />
  )
}

export default App
