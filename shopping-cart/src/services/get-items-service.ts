import { Message } from '@/interface/error-message-type';
import { Items } from '@/interface/items-interface';

export interface GetItemsResponse {
  data: Items | [];
  message: Message;
}

export const getItemsService = async (): Promise<GetItemsResponse> => {
  const response = await fetch('data/items-data.json');
  const items: Items = await response.json();
  return {
    data: items ? items : [],
    message: items ? 'Success' : 'Error',
  };
};
