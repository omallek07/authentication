import { useState, useEffect } from 'react';
import { Flex, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { userApi } from '../apis/userApi';

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
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getAll();
        setUsers(
          response?.data.map((user) => ({ ...user, key: user._id })) || [],
        );
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  console.log(users);

  return <Table<IUser> columns={columns} dataSource={users} />;
};

export default UsersTable;
