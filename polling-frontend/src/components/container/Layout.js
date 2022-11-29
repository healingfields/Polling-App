import React from 'react'
import { Header } from '../common/header/Header'
import {Layout as AntdLayout} from 'antd'
import { Outlet } from 'react-router-dom'


const {Content, Footer} = AntdLayout
export const Layout = () => {

  return (
    <AntdLayout className='layout-container'>
        <Header/>
        <Content className='page-content'>
            <Outlet/>
        </Content>
        <Footer>Footer</Footer>
    </AntdLayout>
  )
}
