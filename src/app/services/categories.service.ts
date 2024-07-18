import { Injectable } from '@angular/core';
import DATA from '../../data.json';
import { Category } from '../model/index';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  data = DATA.categories;
  game: Category = {
    name: '',
    items: [],
  };

  constructor() {}

  getCategories() {
    return this.data;
  }

  getSelectedCategory(category: string) {
    Object.entries(this.data).find(([key, value]) => {
      if (key === category) {
        this.game = {
          name: key,
          items: value,
        };
      }
    });
    return this.game;
  }
}
