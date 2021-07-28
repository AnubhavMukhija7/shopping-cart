import { Item, Items } from '@/interface/items-interface';

export const search = (items: Items, searchBy: string): Items => {
  const arr = [] as Items;
  items.forEach((item) => {
    if (
      //   item.description
      //     .toLocaleLowerCase()
      //     .includes(searchBy.toLocaleLowerCase()) ||
      item.title.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
    ) {
      arr.push(item);
    }
  });
  return arr;
};
