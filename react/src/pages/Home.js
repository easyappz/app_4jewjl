import React from 'react';
import { Typography, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div data-easytag="id1-react/src/pages/Home.js" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingTop: '100px' }}>
      <Title level={1}>Добро пожаловать!</Title>
      <Paragraph style={{ fontSize: '18px', marginBottom: '40px' }}>
        Это приложение с системой регистрации и авторизации пользователей.
      </Paragraph>
      
      {!user ? (
        <Space size="large">
          <Button type="primary" size="large" onClick={() => navigate('/login')}>
            Войти
          </Button>
          <Button size="large" onClick={() => navigate('/register')}>
            Зарегистрироваться
          </Button>
        </Space>
      ) : (
        <div>
          <Paragraph style={{ fontSize: '16px' }}>
            Вы вошли как: <strong>{user.email}</strong>
          </Paragraph>
          <Button type="primary" size="large" onClick={() => navigate('/profile')}>
            Перейти в профиль
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
