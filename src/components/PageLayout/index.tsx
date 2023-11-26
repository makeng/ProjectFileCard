import React, { ReactNode } from 'react'
import { Layout } from '@arco-design/web-react'
import { ConfigProvider, ConfigProviderProps } from '../config'
// var

const { Sider, Header, Footer, Content } = Layout

interface Props extends ConfigProviderProps {
  title?: string
  sider: ReactNode
  content: ReactNode
  footer: ReactNode
}

const Index: React.FC<Props> = (props) => {
  const { title, content,sider, footer } = props

  return (
    <ConfigProvider {...props}>
      <Layout className="h-screen">
        <Header className="text-white pt-2 pb-2 pl-5 text-lg">{title}</Header>
        <Layout className="h-max overflow-scroll">
          <Sider
            resizeDirections={['right']}
            className="bg-transparent"
            style={{ width: '300px' }}
          >
            {sider}
          </Sider>
          <Content>{content}</Content>
        </Layout>
        <Footer>{footer}</Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default Index
