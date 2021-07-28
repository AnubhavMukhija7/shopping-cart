import {
  GetItemsRequest,
  GetItemsResponse,
  getItemsService,
} from '@/services/get-items-service';
import { Items } from '../../interface/items-interface';

export default {
  state: {
    items: [] as Items,
    message: '',
  },
  mutations: {
    GET_ITEMS(state: any, payload: GetItemsResponse) {
      state.items = payload.data;
      state.message = payload.message;
    },
  },
  actions: {
    async getItems(context: any, payload: GetItemsRequest) {
      const response = await getItemsService(payload);
      context.commit('GET_ITEMS', response);
    },
  },
  modules: {},
};
