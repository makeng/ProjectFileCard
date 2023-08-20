import React from 'react'
import './App.scss'
import { createBEM } from '@/utils/ui/bem'

const bem = createBEM('app')

function App() {

  return (
    <div className={bem()}>
      <h2>webpack5-react-ts</h2>
      123456
    </div>
  )
}

export default App
