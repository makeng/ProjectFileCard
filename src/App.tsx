import React from 'react'
import './App.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/utils/router'

const future = {
  v7_startTransition: true,
}

function App() {

  return (
    <RouterProvider
      fallbackElement={null}
      router={router}
      future={future}
    />
  )
}

export default App
