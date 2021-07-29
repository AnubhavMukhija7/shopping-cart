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
      console.log('state', state);
      state.items = payload.data;
      state.message = payload.message;
    },
  },
  actions: {
    async getItems(context: any, payload: GetItemsRequest) {
      console.log('context', context);
      const response = await getItemsService(payload);
      context.commit('GET_ITEMS', response);
    },
  },
  modules: {},
};
