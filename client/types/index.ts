export interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  createdAt: string;
}