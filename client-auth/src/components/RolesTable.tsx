import { useContext } from 'react';
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { useFetchRoles } from '../hooks/useFetchRoles';
import { useState } from 'react';

import { PermissionModal } from './PermissionModal';

import {
  IPermissionsContext,
  PermissionsContext,
} from '../context/permissionsContext';

const RolesTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<IRole | undefined>(
    undefined,
  );
  const [selectedPermissions, setSelectedPermissions] = useState<
    string[] | undefined
  >(undefined);

  const { roles, loading: rolesLoading, error: rolesError } = useFetchRoles();

  const {
    permissions,
    loading: permissionsLoading,
    error: permissionsError,
  } = useContext(PermissionsContext) as IPermissionsContext;

  const loading = rolesLoading || permissionsLoading;
  const error = rolesError || permissionsError;

  console.log('permissions', permissions);

  const showModal = (selectedRole: IRole) => {
    setSelectedRole(roles.find((r) => r._id === selectedRole._id));
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelectPermissions = (permissionNames: string[] | undefined) => {
    console.log('permissiosn', permissions);
    setSelectedPermissions(permissionNames);
  };

  console.log('selectedRole', selectedRole);

  const modalOptions = permissions.map((p) => ({
    value: p.name,
    label: p.name,
  }));

  const columns: TableProps<IRole>['columns'] = [
    {
      title: 'Role',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModal(record)}>Update Permissions</Button>
        </Space>
      ),
    },
  ];

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <PermissionModal
        isModalOpen={isModalOpen}
        options={modalOptions}
        handleOk={handleOk}
        handleCancel={handleCancel}
        changeHandler={handleSelectPermissions}
      />
      <Table<IRole> columns={columns} dataSource={roles} />
    </>
  );
};

export default RolesTable;
