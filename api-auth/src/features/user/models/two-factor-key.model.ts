import mongoose from 'mongoose';
import { IUser } from './user.model';

export interface ITwoFactorKey {
  key: string;
  user: IUser;
}

const twoFactorKeySchema = new mongoose.Schema<ITwoFactorKey>({
  key: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export const TwoFactorKeyModel = mongoose.model<ITwoFactorKey>('TwoFactorKey', twoFactorKeySchema);
