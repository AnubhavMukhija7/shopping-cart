import { Message } from '@/interface/error-message-type';
import { users } from '../data/users-data';
import { User } from '../interface/users-interface';

export interface GetUserRequest {
  username: string;
  password: string;
}

export interface GetUserResponse {
  // undefined ?? Solution if want to pass empty {}
  data: User | Record<string, string>;
  message: Message;
}

export const getUserService = (payload: GetUserRequest): GetUserResponse => {
  const user = users.find(
    (user) =>
      user.userName === payload.username && user.password === payload.password
  );
  return {
    data: user ? user : {},
    message: user ? 'Success' : 'Error',
  };
};
