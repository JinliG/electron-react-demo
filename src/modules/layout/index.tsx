import React from 'react';
import { Layout } from 'antd';
import SideBar from './SiderBar';
import './index.scss';

const { Header, Footer, Content } = Layout;

function MainLayout(props: any) {
  const { children, ...rest } = props;

  return (
    <Layout className="custom-layout">
      <SideBar {...rest} />
      <Layout className="custom-layout">
        <Header className="custom-layout-header">header</Header>
        <Content className="custom-layout-content">
          <div className="custom-layout-main">{children}</div>
        </Content>
        <Footer>footer</Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
