export interface Item {
  name: string;
  selected: boolean;
}

export interface Category {
  name: string;
  items: Item[];
}
