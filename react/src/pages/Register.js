import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';

const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await register(values);
      message.success('Регистрация прошла успешно! Теперь вы можете войти.');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.password?.[0] || 
                          error.response?.data?.email?.[0] ||
                          error.response?.data?.password_confirm?.[0] ||
                          'Ошибка регистрации. Проверьте введенные данные.';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-easytag="id1-react/src/pages/Register.js" style={{ maxWidth: '500px', margin: '0 auto', paddingTop: '50px' }}>
      <Card>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Регистрация</Title>
        
        <Form
          form={form}
          name="register"
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
            name="first_name"
            label="Имя"
            rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Иван" size="large" />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Фамилия"
            rules={[{ required: true, message: 'Пожалуйста, введите фамилию!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Иванов" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
              { min: 8, message: 'Пароль должен содержать минимум 8 символов!' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" size="large" />
          </Form.Item>

          <Form.Item
            name="password_confirm"
            label="Подтверждение пароля"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Пожалуйста, подтвердите пароль!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Подтвердите пароль" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text>Уже есть аккаунт? <Link to="/login">Войти</Link></Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
