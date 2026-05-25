import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UsersTable from '../../components/UsersTable';
import RolesTable from '../../components/RolesTable';
import PermissionsTable from '../../components/PermissionsTable';
import { PermissionsProvider } from '../../context/permissionsContext';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Manage Users',
    children: <UsersTable />,
  },
  {
    key: '2',
    label: 'Manage Roles',
    children: <RolesTable />,
  },
  {
    key: '3',
    label: 'Manage Permissions',
    children: <PermissionsTable />,
  },
];

const PermissionTabs: React.FC = () => {
  return (
    <PermissionsProvider>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />;
    </PermissionsProvider>
  );
};

export default PermissionTabs;
