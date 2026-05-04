import { useEffect } from 'react';
import { authApi } from '../../apis/authApi';

function AccessPage() {
  useEffect(() => {
    const requiredToken = async () => {
      return authApi.access();
    };

    requiredToken();
  }, []);

  return <div></div>;
}

export default AccessPage;
