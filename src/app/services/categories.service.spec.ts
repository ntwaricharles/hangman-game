import { TestBed } from '@angular/core/testing';
import { CategoriesService } from './categories.service';
import DATA from '../../data.json';

// Define the Categories type
type Categories = {
  [key: string]: { name: string; selected: boolean }[];
};

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return categories data', () => {
    const categories = service.getCategories();
    expect(categories).toEqual(DATA.categories);
  });

  it('should return selected category', () => {
    const categoryName = 'Movies'; // Use an existing category name
    const expectedCategory = {
      name: categoryName,
      items: (DATA.categories as Categories)[categoryName],
    };

    const selectedCategory = service.getSelectedCategory(categoryName);
    expect(selectedCategory).toEqual(expectedCategory);
  });

  it('should return empty category if not found', () => {
    const categoryName = 'nonExistentCategory';
    const expectedCategory = {
      name: '',
      items: [],
    };

    const selectedCategory = service.getSelectedCategory(categoryName);
    expect(selectedCategory).toEqual(expectedCategory);
  });
});
