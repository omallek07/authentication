import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UsersTable from '../../components/UsersTable';
import RolesTable from '../../components/RolesTable';
import PermissionsTable from '../../components/PermissionsTable';
import { PermissionsProvider } from '../../context/permissionsContext';
import { usePermission } from '../../hooks/usePermission';

const onChange = (key: string) => {
  console.log(key);
};

const PermissionTabs: React.FC = () => {
  const { hasPermission } = usePermission();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Manage Users',
      children: <UsersTable />,
      disabled: hasPermission('VIEW_USERS'),
    },
    {
      key: '2',
      label: 'Manage Roles',
      children: <RolesTable />,
      disabled: hasPermission('VIEW_ROLES'),
    },
    {
      key: '3',
      label: 'Manage Permissions',
      children: <PermissionsTable />,
      disabled: hasPermission('VIEW_PERMISSIONS'),
    },
  ];

  return (
    <PermissionsProvider>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />;
    </PermissionsProvider>
  );
};

export default PermissionTabs;
