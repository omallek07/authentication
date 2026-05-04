import { Button } from 'antd';
import { useAuthStore, useUserStore } from '../stores';
import { useNavigate } from 'react-router';

export default function LogoutButton() {
  const navigate = useNavigate();
  const resetUser = useUserStore((state) => state.resetUser);
  const resetAuth = useAuthStore((state) => state.resetAuth);

  const onClick = () => {
    navigate('/sign-in');
    resetAuth();
    resetUser();
  };

  return <Button onClick={onClick}>Logout</Button>;
}
