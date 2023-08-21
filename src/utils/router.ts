import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
// pages
import Home from '@/pages/home'

export const routes = [
  {
    path: '/',
    Component: Home
  },
] satisfies [RouteObject, ...RouteObject[]]

export const router = createBrowserRouter(routes)
