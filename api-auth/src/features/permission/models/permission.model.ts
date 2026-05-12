import mongoose from 'mongoose';

export interface IPermission {
  name: string;
  method: string;
  path: string;
  description?: string;
}

const permissionSchema = new mongoose.Schema<IPermission>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  method: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

export const PermissionModel = mongoose.model<IPermission>('Permission', permissionSchema);
