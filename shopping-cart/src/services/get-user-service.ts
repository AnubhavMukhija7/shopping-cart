import { Message } from '@/interface/error-message-type';
import { User, Users } from '../interface/users-interface';

export interface GetUserRequest {
  username: string;
  password: string;
}

export interface GetUserResponse {
  data: User | Record<string, string>;
  message: Message;
}

export interface Response {
  data: Users;
}

export const getUserService = async (
  payload: GetUserRequest
): Promise<GetUserResponse> => {
  const response = await fetch('data/users-data.json');
  const data: Response = await response.json();
  const user = data.data.find(
    (user) =>
      user.userName === payload.username && user.password === payload.password
  );
  return {
    data: user ? user : {},
    message: user ? 'Success' : 'Error',
  };
};
