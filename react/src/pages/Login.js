import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await login(values);
      authLogin(response.data.access, response.data.refresh, response.data.user);
      message.success('Вход выполнен успешно!');
      navigate('/profile');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Ошибка входа. Проверьте email и пароль.';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Login.js" style={{ maxWidth: '500px', margin: '0 auto', paddingTop: '50px' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Вход</Title>
        
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="example@mail.com" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Войти
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
