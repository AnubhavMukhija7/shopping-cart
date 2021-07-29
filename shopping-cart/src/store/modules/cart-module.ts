import { CartItem, CartItems } from '@/interface/cart-items-interace';
import { Item } from '@/interface/items-interface';

export default {
  state: {
    cartItems: [] as CartItems,
    subTotalPrice: 0,
    tax: 0,
    totalPrice: 0,
  },
  mutations: {
    ADD_ITEM(state: any, payload: CartItem) {
      if (state.cartItems.length < 1) {
        const subTotalPrice = payload.price.value * payload.quantitySelected;
        payload = { ...payload, subTotalPrice };
        state.cartItems.push(payload);
      } else {
        let isPresent = false;
        state.cartItems.map((item: CartItem) => {
          if (
            item.id === payload.id &&
            payload.sizeSelected === item.sizeSelected &&
            payload.colorSelected === item.colorSelected
          ) {
            isPresent = true;
            item.quantitySelected += payload.quantitySelected;
            if (item.subTotalPrice) {
              item.subTotalPrice +=
                payload.price.value * payload.quantitySelected;
            }
          }
        });
        if (!isPresent) {
          const subTotalPrice = payload.price.value * payload.quantitySelected;
          payload = { ...payload, subTotalPrice };
          state.cartItems.push(payload);
        }
      }
    },
    UPDATE_ITEM(state: any, payload: Item) {
      state.cartItems = payload;
      const total = 0;
      const productArray = state.cartItems;
      //   productArray.forEach((product: Items) => {
      //     if (product.quantity > 0) {
      //       total += product.price * product.quantity;
      //     } else {
      //       alert('enter the quantity in positive value');
      //       product.quantity = 1;
      //     }
      //   });
      console.log(total);
      state.subTotalPrice = total;
      state.tax = (12 / 100) * total;
      state.totalPrice = state.subTotalPrice + state.tax;
    },
    DELETE_ITEM(state: any, productId: number) {
      state.cartItems = state.cartItems.filter(
        (product: CartItem) => product.id !== productId
      );
    },
  },
  actions: {
    addItem(context: any, payload: CartItem) {
      context.commit('ADD_ITEM', payload);
    },
    updateItem(context: any, payload: Item) {
      context.commit('UPDATE_ITEM', payload);
    },
    deleteItem(context: any, payload: number) {
      context.commit('DELETE_ITEM', payload);
    },
  },
};
