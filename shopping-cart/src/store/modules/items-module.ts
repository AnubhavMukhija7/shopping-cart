import {
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
    async getItems(context: any) {
      const response = await getItemsService();
      context.commit('GET_ITEMS', response);
    },
    
  },
  modules: {},
};
