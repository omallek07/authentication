'use client';

import { MailOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Typography,
  message,
} from 'antd';
import { useState } from 'react';
import { useUserStore } from '../../stores';
import Header from '../../components/Header';
import LogoutButton from '../../components/LogoutButton';
import { authApi } from '../../apis/authApi';
import { toast } from 'react-toastify';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function ProfilePage() {
  const [form] = Form.useForm();

  const user = useUserStore((state) => state.user);
  const updateUserData = useUserStore((state) => state.updateUserData);

  const [userData, setUserData] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    bio: 'Frontend developer passionate about creating intuitive user experiences. I love working with React and exploring new technologies.',
    avatarUrl: '/placeholder.svg?height=200&width=200',
  });
  const [name, setName] = useState(user?.name ?? '');

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        setUserData({ ...userData, ...values });
        message.success('Profile updated successfully!');
      })
      .catch((info) => {
        message.error('Validation failed. Please check your inputs.');
      });
  };

  const handleChangeName = async () => {
    try {
      const res = await authApi.changeProfile({ name });
      updateUserData({
        name: res.data.name,
      });
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <Header />
      <Card style={{ borderRadius: '8px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <Avatar
            size={120}
            icon={<UserOutlined />}
            src={userData.avatarUrl}
            style={{ marginBottom: '16px' }}
          />

          <Text type='secondary' style={{ fontSize: '16px' }}>
            <MailOutlined style={{ marginRight: '8px' }} />
            {userData.email}
          </Text>

          <div style={{ margin: '10px 0', textAlign: 'center' }}>
            <Input
              type='secondary'
              style={{ fontSize: '16px' }}
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
            />
            <Button
              onClick={handleChangeName}
              style={{
                margin: '10px 0',
              }}
            >
              Change Name
            </Button>

            <Divider style={{ margin: '16px 0' }} />
            <Paragraph style={{ maxWidth: '600px', textAlign: 'left' }}>
              {userData.bio}
            </Paragraph>
          </div>
        </div>
      </Card>
      <div
        style={{
          textAlign: 'right',
          marginTop: '10px',
        }}
      >
        <LogoutButton />
      </div>
    </div>
  );
}
