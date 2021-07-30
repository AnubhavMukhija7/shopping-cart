import { CartItem, CartItems } from '@/interface/cart-items-interace';
import { Item } from '@/interface/items-interface';
import uniqid from 'uniqid';

export default {
  state: {
    cartItems: [] as CartItems,
    subTotalPrice: 0,
    tax: 0,
    totalPrice: 0,
  },
  mutations: {
    ADD_ITEM(state: any, payload: CartItem) {
      const cartItemId = uniqid('cartItem-');
      if (state.cartItems.length < 1) {
        const subTotalPrice = payload.price.value * payload.quantitySelected;
        payload = { ...payload, subTotalPrice, cartItemId };
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
            if (item.subTotalPrice && item.cartItemId) {
              item.cartItemId = cartItemId;
              item.subTotalPrice +=
                payload.price.value * payload.quantitySelected;
            }
          }
        });
        if (!isPresent) {
          const subTotalPrice = payload.price.value * payload.quantitySelected;
          payload = { ...payload, subTotalPrice, cartItemId };
          state.cartItems.push(payload);
        }
      }
    },
    UPDATE_ITEM(state: any, payload: CartItem) {
      state.cartItems.forEach((item: CartItem) => {
        if (item.cartItemId === payload.cartItemId) {
          item.subTotalPrice = payload.price.value * payload.quantitySelected;
          item = payload;
        }
      });
    },
    GET_AMOUNT(state: any) {
      let total = 0;
      state.cartItems.forEach(
        (product: CartItem) =>
          (total += product.price.value * product.quantitySelected)
      );
      state.subTotalPrice = total;
      state.tax = Math.round((12 / 100) * total);
      state.totalPrice = state.subTotalPrice + state.tax;
    },
    DELETE_ITEM(state: any, productId: string) {
      state.cartItems = state.cartItems.filter(
        (product: CartItem) => product.cartItemId !== productId
      );
    },
    CLEAR_CART(state: any) {
      state.cartItems = [];
      state.subTotalPrice = 0;
      state.tax = 0;
      state.totalPrice = 0;
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
    getAmount(context: any) {
      context.commit('GET_AMOUNT');
    },
    clearCart(context: any) {
      context.commit('CLEAR_CART');
    },
  },
};
