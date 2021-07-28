import { Message } from '@/interface/error-message-type';
import { User, Users } from '../interface/users-interface';

export interface GetUserRequest {
  username: string;
  password: string;
}

export interface GetUserResponse {
  // undefined ?? Solution if want to pass empty {}
  data: User | Record<string, string>;
  message: Message;
}

export const getUserService = async (
  payload: GetUserRequest
): Promise<GetUserResponse> => {
  const response = await fetch('/data/user-data.json');
  console.log(response);

  const data: Users = await response.json();
  console.log(data);
  const user = data.find(
    (user) =>
      user.userName === payload.username && user.password === payload.password
  );
  console.log('user', user);
  return {
    data: user ? user : {},
    message: user ? 'Success' : 'Error',
  };
};
