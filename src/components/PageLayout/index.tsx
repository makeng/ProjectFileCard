import React, { ReactNode } from 'react'
import { Layout } from '@arco-design/web-react'
import { ConfigProvider, ConfigProviderProps } from '../config'
// fn

const { Sider, Header, Footer, Content } = Layout

interface Props extends ConfigProviderProps {
  header: ReactNode
  sider: ReactNode
  content: ReactNode
  footer: ReactNode
}

const Index: React.FC<Props> = (props) => {
  const { header, sider, content, footer } = props
  return (
    <ConfigProvider {...props}>
      <Layout>
        <Header>{header}</Header>
        <Layout>
          <Sider
            resizeDirections={['right']}
            style={{
              minWidth: 150,
              maxWidth: 500,
              backgroundColor: 'transparent'
            }}
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
