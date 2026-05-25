import { Flex, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useFetchUsers } from '../hooks/useFetchUsers';

const columns: TableProps<IUser>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Roles',
    key: 'roles',
    dataIndex: 'roles',
    render: (_, { roles }) => (
      <Flex gap='small' align='center' wrap>
        {roles.map((role) => {
          let color = 'blue';
          switch (role.name) {
            case 'admin':
              color = 'volcano';
              break;
            case 'manager':
              color = 'yellow';
              break;
            default:
              color = 'blue';
          }

          return (
            <Tag color={color} key={role.name}>
              {role.name.toUpperCase()}
            </Tag>
          );
        })}
      </Flex>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const UsersTable: React.FC = () => {
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();

  if (usersLoading) return <p>Loading users...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;
  return <Table<IUser> columns={columns} dataSource={users} />;
};

export default UsersTable;
