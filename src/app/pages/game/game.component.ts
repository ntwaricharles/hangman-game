import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../model/index';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  life: number = 8;
  progressWidth: number = 100;
  isCompleted: boolean = false;
  isPopupOpen: boolean = false;
  isOptionsPopupOpen: boolean = false; // Add this line
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  word: string[] = [];
  displayedWord: string[] = [];
  category: string = '';
  activeGame: Category = {
    name: '',
    items: [],
  };
  question: { name: string; selected: boolean } = { name: '', selected: false };
  guessedLetters: Set<string> = new Set();

  constructor(
    private router: ActivatedRoute,
    private categoriesService: CategoriesService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.category = params.get('game') || '';
      if (this.category !== '') {
        this.category = this.category.split('_').join(' ');
        this.loadGame();
      }
    });

    this.loadGame();
    this.restartGame();
  }

  toggleOptions() {
    this.isOptionsPopupOpen = !this.isOptionsPopupOpen;
  }

  loadGame() {
    this.activeGame = this.categoriesService.getSelectedCategory(this.category);
  }

  selectNewCategory() {
    this.route.navigate(['/categories']);
  }

  handleLetterClick(letter: string) {
    if (!this.guessedLetters.has(letter)) {
      if (this.word.includes(letter)) {
        for (let i = 0; i < this.word.length; i++) {
          if (this.word[i] === letter) {
            this.displayedWord[i] = letter;
          }
        }

        if (this.displayedWord.join('') === this.word.join('')) {
          this.isCompleted = true;
          this.isPopupOpen = true;
        }
      } else {
        this.life--;
        this.progressWidth = (this.life / 8) * 100;
        if (this.life === 0) {
          this.isPopupOpen = true;
        }
      }

      this.guessedLetters.add(letter);
    }
  }

  resumeGame() {
    this.isPopupOpen = false;
    this.isOptionsPopupOpen = false;
  }

  exitGame() {
    this.isPopupOpen = false;
    this.route.navigate(['/']);
  }

  restartGame() {
    this.life = 8;
    this.isPopupOpen = false;
    this.isOptionsPopupOpen = false;
    this.guessedLetters.clear();

    const randomItem =
      this.activeGame.items[
        Math.floor(Math.random() * this.activeGame.items.length)
      ];

    this.word = randomItem.name.toUpperCase().split('');
    this.displayedWord = Array(this.word.length).fill('');
    this.progressWidth = 100;
  }
}
