import React from 'react'
import { PageLayout } from './components'
import { Button } from '@arco-design/web-react'
import '@arco-design/web-react/dist/css/arco.css'


function App() {
  return (
    <PageLayout
      className="bg-slate-900	h-screen"
      header={1}
      sider={2}
      content={<Button type="primary">Primary</Button>}
      footer={4}
    />
  )
}

export default App
