import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined, LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Главная</Link>,
    },
    ...(!user ? [
      {
        key: '/login',
        icon: <LoginOutlined />,
        label: <Link to="/login">Вход</Link>,
      },
      {
        key: '/register',
        icon: <UserAddOutlined />,
        label: <Link to="/register">Регистрация</Link>,
      },
    ] : [
      {
        key: '/profile',
        icon: <UserOutlined />,
        label: <Link to="/profile">Профиль</Link>,
      },
    ]),
  ];

  return (
    <Layout data-easytag="id1-react/src/components/Layout/AppLayout.js" style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 50px' }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginRight: '50px' }}>
          MyApp
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '50px' }}>
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout;
