import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { GameComponent } from './game.component';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../model/index';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let mockCategoriesService: jest.Mocked<CategoriesService>;
  let mockActivatedRoute: any;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    // Create a mock object for CategoriesService
    mockCategoriesService = {
      getSelectedCategory: jest.fn() as jest.MockedFunction<
        typeof mockCategoriesService.getSelectedCategory
      >,
    } as unknown as jest.Mocked<CategoriesService>;

    // Mock ActivatedRoute
    mockActivatedRoute = { paramMap: of({ get: () => 'exampleCategory' }) };

    // Create a mock object for Router
    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;

    // Set up the mock return value for getSelectedCategory
    (mockCategoriesService.getSelectedCategory as jest.Mock).mockReturnValue({
      name: 'exampleCategory',
      items: [{ name: 'test', selected: false }],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    component.ngOnInit();
    expect(component.category).toBe('exampleCategory');
    expect(component.activeGame.name).toBe('exampleCategory');
    expect(component.activeGame.items).toEqual([
      { name: 'test', selected: false },
    ]);
  });

  it('should toggle options popup', () => {
    expect(component.isOptionsPopupOpen).toBe(false);
    component.toggleOptions();
    expect(component.isOptionsPopupOpen).toBe(true);
  });

  it('should load game correctly', () => {
    component.loadGame();
    expect(component.activeGame).toEqual({
      name: 'exampleCategory',
      items: [{ name: 'test', selected: false }],
    });
  });

  it('should navigate to categories on selectNewCategory', () => {
    component.selectNewCategory();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/categories']);
  });

  it('should handle letter click correctly', () => {
    component.word = ['T', 'E', 'S', 'T'];
    component.displayedWord = ['', '', '', ''];
    component.guessedLetters = new Set<string>();

    component.handleLetterClick('T');
    expect(component.displayedWord).toEqual(['T', '', '', 'T']);
    expect(component.guessedLetters.has('T')).toBe(true);

    component.handleLetterClick('A');
    expect(component.life).toBe(7);
    expect(component.progressWidth).toBe((7 / 8) * 100);
    expect(component.guessedLetters.has('A')).toBe(true);
  });

  it('should resume game correctly', () => {
    component.isPopupOpen = true;
    component.isOptionsPopupOpen = true;
    component.resumeGame();
    expect(component.isPopupOpen).toBe(false);
    expect(component.isOptionsPopupOpen).toBe(false);
  });

  it('should exit game correctly', () => {
    component.exitGame();
    expect(component.isPopupOpen).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should restart game correctly', () => {
    component.activeGame = {
      name: 'exampleCategory',
      items: [{ name: 'test', selected: false }],
    };
    component.restartGame();
    expect(component.life).toBe(8);
    expect(component.isPopupOpen).toBe(false);
    expect(component.isOptionsPopupOpen).toBe(false);

    const hintCount = Math.ceil(component.word.length * 0.3);
    expect(component.guessedLetters.size).toBe(hintCount);
    expect(component.word).toEqual(['T', 'E', 'S', 'T']);
    expect(component.progressWidth).toBe(100);

    const nonEmptyDisplayedWordCount = component.displayedWord.filter(
      (letter) => letter !== ''
    ).length;
    expect(nonEmptyDisplayedWordCount).toBe(hintCount);
  });
});
