import { Items } from '@/interface/items-interface';

export const sort = (data: Items, sortBy: number): Items => {
  const arr = data;
  if (sortBy === 2) {
    arr.sort(function (a, b) {
      return a.price.value - b.price.value;
    });
  } else {
    arr.sort(function (a, b) {
      return b.price.value - a.price.value;
    });
  }
  return arr;
};
