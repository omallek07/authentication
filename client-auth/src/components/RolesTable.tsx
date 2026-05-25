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
import { permissionsApi } from '../apis/permissionsApi';

const RolesTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<IRole | undefined>(
    undefined,
  );
  const [selectedPermissions, setSelectedPermissions] = useState<
    string[] | undefined
  >(undefined);

  const includePermissions = true;
  const {
    roles,
    loading: rolesLoading,
    error: rolesError,
  } = useFetchRoles(includePermissions);

  const {
    permissions,
    loading: permissionsLoading,
    error: permissionsError,
  } = useContext(PermissionsContext) as IPermissionsContext;

  const loading = rolesLoading || permissionsLoading;
  const error = rolesError || permissionsError;

  const showModal = (selectedRole: IRole) => {
    setSelectedRole(roles.find((r) => r._id === selectedRole._id));
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (!selectedRole) {
      return setIsModalOpen(false);
    }

    const newPermissions = selectedPermissions ?? [];
    await permissionsApi.addPermissionsToRole(selectedRole._id, newPermissions);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setSelectedRole(undefined);
    setIsModalOpen(false);
  };

  const handleSelectPermissions = (permissionNames: string[] | undefined) => {
    setSelectedPermissions(permissionNames);
  };

  const modalOptions = permissions.map((p) => ({
    value: p.name,
    label: p.name,
  }));

  const defaultValues = selectedRole?.permissions?.map((p) => p.name);

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
        values={selectedPermissions}
        defaultValues={defaultValues}
        handleOk={handleOk}
        handleCancel={handleCancel}
        changeHandler={handleSelectPermissions}
      />
      <Table<IRole> columns={columns} dataSource={roles} />
    </>
  );
};

export default RolesTable;
