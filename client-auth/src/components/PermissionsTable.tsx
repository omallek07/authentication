import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {
  PermissionsContext,
  IPermissionsContext,
} from '../context/permissionsContext';
import { useContext } from 'react';

const columns: TableProps<IPermission>['columns'] = [
  {
    title: 'HTTP Method',
    dataIndex: 'method',
    key: 'method',
    render: (text) => {
      let color = 'blue';
      switch (text) {
        case 'GET':
          color = 'green';
          break;
        case 'POST':
          color = 'blue';
          break;
        case 'PUT':
          color = 'orange';
          break;
        case 'DELETE':
          color = 'red';
          break;
        case 'PATCH':
          color = 'purple';
          break;
        default:
          color = 'blue';
      }
      return (
        <Tag color={color} key={text}>
          {text}
        </Tag>
      );
    },
  },
  {
    title: 'Path',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: 'Permission Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (text) => <a>{text ?? 'No description yet'}</a>,
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

const PermissionsTable: React.FC = () => {
  const {
    permissions,
    loading: permissionsLoading,
    error: permissionsError,
  } = useContext(PermissionsContext) as IPermissionsContext;

  if (permissionsLoading) return <p>Loading permissions...</p>;
  if (permissionsError)
    return <p>Error loading permissions: {permissionsError}</p>;
  return <Table<IPermission> columns={columns} dataSource={permissions} />;
};

export default PermissionsTable;
