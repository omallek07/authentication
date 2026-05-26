import { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {
  PermissionsContext,
  IPermissionsContext,
} from '../context/permissionsContext';
import { useContext } from 'react';
import { PermissionUpdateModal } from './PermissionUpdateModal';
import { toast } from 'react-toastify';
import { permissionsApi } from '../apis/permissionsApi';

const PermissionsTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermissionName, setSelectedPermissionName] =
    useState<string>('');
  const [selectedPermissionId, setSelectedPermissionId] = useState('');

  const {
    permissions,
    loading: permissionsLoading,
    error: permissionsError,
    reload: reloadPermissions,
  } = useContext(PermissionsContext) as IPermissionsContext;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await permissionsApi.updatePermission(selectedPermissionId, {
      name: selectedPermissionName,
    });
    reloadPermissions();
    toast.success('Permission updated successfully!');
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setSelectedPermissionName('');
    setSelectedPermissionId('');
    setIsModalOpen(false);
  };

  if (permissionsLoading) return <p>Loading permissions...</p>;
  if (permissionsError)
    return <p>Error loading permissions: {permissionsError}</p>;

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
          <Button
            onClick={() => {
              setSelectedPermissionId(record._id);
              setSelectedPermissionName(record.name);
              showModal();
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<IPermission> columns={columns} dataSource={permissions} />
      <PermissionUpdateModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        defaultValue={selectedPermissionName}
        value={selectedPermissionName}
        changeHandler={setSelectedPermissionName}
      />
    </>
  );
};

export default PermissionsTable;
