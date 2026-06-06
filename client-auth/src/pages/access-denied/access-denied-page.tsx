import { Button, Result } from 'antd';
import { Link } from 'react-router';

const AccessDeniedPage = () => (
  <Result
    status='403'
    title='403'
    subTitle='Sorry, you are not authorized to access this page.'
    extra={
      <Button>
        <Link to={'/'} replace={true}>
          Back Home
        </Link>
      </Button>
    }
  />
);

export default AccessDeniedPage;
