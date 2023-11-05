import React, { ReactNode } from 'react'
import { Layout } from '@arco-design/web-react'
import { ConfigProvider, ConfigProviderProps } from '../config'
// var
import FolderMenu from './FolderMenu'

const { Sider, Header, Footer, Content } = Layout

interface Props extends ConfigProviderProps {
  title?: string
  folderList: Obj[]
  content: ReactNode
  footer: ReactNode
}

const Index: React.FC<Props> = (props) => {
  const { title, folderList, content, footer } = props

  return (
    <ConfigProvider {...props}>
      <Layout>
        <Header className="text-white pt-2 pl-5 text-lg">{title}</Header>
        <Layout>
          <Sider
            resizeDirections={['right']}
            style={{
              minWidth: 150,
              maxWidth: 500,
              backgroundColor: 'transparent'
            }}
          >
            <FolderMenu folderList={folderList}/>
          </Sider>
          <Content>{content}</Content>
        </Layout>
        <Footer>{footer}</Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default Index
