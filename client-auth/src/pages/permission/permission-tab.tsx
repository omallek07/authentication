import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import UsersTable from '../../components/UsersTable';

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
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Manage Permissions',
    children: 'Content of Tab Pane 3',
  },
];

const PermissionTabs: React.FC = () => {
  return <Tabs defaultActiveKey='1' items={items} onChange={onChange} />;
};

export default PermissionTabs;
