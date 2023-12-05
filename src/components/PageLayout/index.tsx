import React, { ReactNode } from 'react'
import { Layout } from '@arco-design/web-react'
import classNames from 'classnames'
// var

const { Sider, Header, Footer, Content } = Layout

interface Props {
  title?: string
  className?: string;
  sider: ReactNode
  content: ReactNode
  footer: ReactNode
}

const Index: React.FC<Props> = (props) => {
  const { title, className, content, sider, footer } = props

  return (
    <Layout className={classNames('h-screen', className)}>
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
  )
}

export default Index
