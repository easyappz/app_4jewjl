import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button, Form, Input, Typography, Space, message, Modal } from 'antd';
import { UserOutlined, MailOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../api/auth';

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const { user, logout, updateUser } = useAuth();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user, form]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    form.setFieldsValue({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await updateUserProfile(values);
      updateUser(response.data);
      message.success('Профиль успешно обновлен!');
      setEditing(false);
    } catch (error) {
      const errorMessage = error.response?.data?.email?.[0] || 'Ошибка обновления профиля.';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Modal.confirm({
      title: 'Выход из аккаунта',
      content: 'Вы уверены, что хотите выйти?',
      okText: 'Да',
      cancelText: 'Отмена',
      onOk: () => {
        logout();
        message.success('Вы вышли из аккаунта');
      },
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div data-easytag="id1-react/src/pages/Profile.js" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2} style={{ margin: 0 }}>Профиль пользователя</Title>
            <Button 
              type="primary" 
              danger 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </div>

          {!editing ? (
            <div>
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Имя">{user.first_name}</Descriptions.Item>
                <Descriptions.Item label="Фамилия">{user.last_name}</Descriptions.Item>
                <Descriptions.Item label="Дата регистрации">
                  {new Date(user.date_joined).toLocaleDateString('ru-RU')}
                </Descriptions.Item>
              </Descriptions>
              
              <Button 
                type="primary" 
                icon={<EditOutlined />} 
                onClick={handleEdit}
                style={{ marginTop: '20px' }}
              >
                Редактировать профиль
              </Button>
            </div>
          ) : (
            <Form
              form={form}
              name="profile"
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

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Сохранить
                  </Button>
                  <Button onClick={handleCancel}>
                    Отмена
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default Profile;
