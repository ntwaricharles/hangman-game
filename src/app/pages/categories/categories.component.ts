import { CategoriesService } from '../../services/categories.service';
import { Item } from '../../model/index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories:
    | {
        Movies: Item[];
        'TV Shows': Item[];
        Countries: Item[];
        'Capital Cities': Item[];
        Animals: Item[];
        Sports: Item[];
      }
    | undefined;

  keys: string[] = [];
  paramKeys: string[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.categoriesService.getCategories();
    this.keys = Object.keys(this.categories);
    this.paramKeys = this.keys.map((key) => key.split(' ').join('_'));
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
