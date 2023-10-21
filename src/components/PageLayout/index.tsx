import React, { ReactNode } from 'react'
import { Layout } from '@arco-design/web-react'
// fn

const { Sider, Header, Footer, Content } = Layout

interface Props {
  header: ReactNode
  sider: ReactNode
  content: ReactNode
  footer: ReactNode
}

const Index: React.FC<Props> = ({ header, sider, content, footer }) => {
  return (
    <Layout>
      <Header>{header}</Header>
      <Layout>
        <Sider
          resizeDirections={['right']}
          style={{
            minWidth: 150,
            maxWidth: 500,
            height: 200,
          }}
        >
          {sider}
        </Sider>
        <Content>{content}</Content>
      </Layout>
      <Footer>{footer}</Footer>
    </Layout>
  )
}

export default Index
