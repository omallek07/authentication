import { Button } from 'antd';
import { useUserStore } from '../stores';
import { useNavigate } from 'react-router';
import { authApi } from '../apis/authApi';

export default function LogoutButton() {
  const navigate = useNavigate();
  const resetUserStore = useUserStore((state) => state.resetUserStore);

  const onClick = async () => {
    await authApi.logout();
    resetUserStore();
    navigate('/sign-in');
  };

  return <Button onClick={onClick}>Logout</Button>;
}
