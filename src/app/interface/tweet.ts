import { User } from './user';

export interface Tweet {
  id: string;
  content: string;
  create_at: Date;
  user: User;
}
