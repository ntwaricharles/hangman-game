import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToCategories(): void {
    console.log('Navigating to categories...');
    this.router.navigate(['/categories']);
  }

  goToGuidence(): void {
    console.log('Navigating to guidance...');
    this.router.navigate(['/guidence']);
  }
}
