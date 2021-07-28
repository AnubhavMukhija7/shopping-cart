import { Message } from '@/interface/error-message-type';
import { Items } from '@/interface/items-interface';

interface GetItemsResponse {
  data: Items | [];
  message: Message;
}

// export const getItemsService = (): GetItemsResponse => {
//   return {
//     data: items ? items : [],
//     message: items ? 'Success' : 'Error',
//   };
// };
