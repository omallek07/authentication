import { Input, Modal } from 'antd';

type PermissionUpdateModalProps = {
  value: string;
  defaultValue: string;
  handleOk: () => void;
  handleCancel: () => void;
  changeHandler: (input: string) => void;
  isModalOpen: boolean;
};

export const PermissionUpdateModal = ({
  value,
  defaultValue,
  handleOk,
  handleCancel,
  changeHandler,
  isModalOpen,
}: PermissionUpdateModalProps) => {
  return (
    <div>
      <Modal
        title='Update Permission'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder='Enter your permission name'
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => changeHandler(e.target.value)}
        />
      </Modal>
    </div>
  );
};
