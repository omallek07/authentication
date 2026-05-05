import { Button } from 'antd';
import { useUserStore } from '../stores';
import { useNavigate } from 'react-router';

export default function LogoutButton() {
  const navigate = useNavigate();
  const resetUser = useUserStore((state) => state.resetUser);

  const onClick = () => {
    navigate('/sign-in');
    resetUser();
  };

  return <Button onClick={onClick}>Logout</Button>;
}
