import { User } from '@/interface/users-interface';
import {
  GetUserRequest,
  GetUserResponse,
  getUserService,
} from '@/services/get-user-service';

export default {
  //divide file into auth-actions, state, mutations, getters if time is left...
  state: {
    user: {} as User,
    message: '',
  },
  mutations: {
    //any -state type?? ASK
    AUTH_USER(state: any, payload: GetUserResponse) {
      state.user = payload.data;
      state.message = payload.message;
    },
    CLEAR_STATE(state: any) {
      state.user = {};
      state.message = '';
    },
  },
  actions: {
    //any -context type?? ASK , ALSO CAN ACTION AND MUTATION BE MAPPED because payload have any type in mutation?
    async authUser(context: any, payload: GetUserRequest) {
      const response = await getUserService(payload);
      context.commit('AUTH_USER', response);
    },
    clearState(context: any) {
      context.commit('CLEAR_STATE');
    },
  },
  modules: {},
};
