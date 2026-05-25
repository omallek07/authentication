import { Modal, Select } from 'antd';

type PermissionModalProps = {
  options: Array<{
    label: string;
    value: string;
  }>;
  defaultValue?: Array<{
    label: string;
    value: string;
  }>;
  handleOk: () => void;
  handleCancel: () => void;
  changeHandler: (values: string[] | undefined) => void;
  isModalOpen: boolean;
};

export const PermissionModal = ({
  options,
  handleOk,
  handleCancel,
  changeHandler,
  isModalOpen,
}: PermissionModalProps) => {
  return (
    <div>
      <Modal
        title='Update Permission'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Select
          mode='multiple'
          allowClear
          style={{ width: '100%' }}
          placeholder='Please select permissions'
          onChange={changeHandler}
          options={options}
        />
      </Modal>
    </div>
  );
};
