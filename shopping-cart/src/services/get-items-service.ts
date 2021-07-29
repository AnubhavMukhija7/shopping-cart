import { Message } from '@/interface/error-message-type';
import { Items } from '@/interface/items-interface';
import { filterItem } from '@/utils/filterData';
import { search } from '@/utils/searchData';
import { sort } from '@/utils/sortData';

export interface GetItemsResponse {
  data: Items | [];
  message: Message;
}

export interface GetItemsRequest {
  search: string;
  sortBy: number;
  filterBy : number[]|[];
}

export const getItemsService = async (
  payload: GetItemsRequest
): Promise<GetItemsResponse> => {
  const response = await fetch('data/items-data.json');
  let items: Items = await response.json();
  console.log(payload);
  if (payload.search !== '') {
    items = search(items, payload.search);
  }
  if (payload.sortBy !== 0) {
    items = sort(items, payload.sortBy);
  }
  if(payload.filterBy !== []){
    items = filterItem(items,payload.filterBy);
  }
  return {
    data: items ? items : [],
    message: items ? 'Success' : 'Error',
  };
};
