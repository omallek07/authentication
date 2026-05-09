import { CheckOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
import { authApi } from '../../apis/authApi';

const { Title, Paragraph } = Typography;

export default function ResetPasswordPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);

    const email = searchParams.get('email');
    const resetToken = searchParams.get('resetToken');

    if (!email || !resetToken) {
      toast.error('Please click forgot password first! ');
      navigate('/forgot-password');
      return;
    }

    const payload = {
      email,
      resetToken,
      newPassword: values.password,
      confirmNewPassword: values.confirmPassword,
    };
    // call to reset password
    try {
      await authApi.resetPassword(payload);
      toast.success('Reset password successfully');
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '24px' }}>
      <Card bordered={false} style={{ borderRadius: '8px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2}>Reset Your Password</Title>
          <Paragraph type='secondary'>
            Please create a new password for your account
          </Paragraph>
        </div>

        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            name='email'
            label='Email'
            initialValue={searchParams.get('email') || ''}
          >
            <Input prefix={<MailOutlined />} disabled size='large' />
          </Form.Item>

          <Form.Item
            name='password'
            label='New Password'
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='New password'
              size='large'
            />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            label='Confirm Password'
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords do not match'),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Confirm password'
              size='large'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              icon={<CheckOutlined />}
              size='large'
              block
              loading={loading}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
