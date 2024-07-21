import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GuidanceComponent } from './guidance.component';

describe('GuidanceComponent', () => {
  let component: GuidanceComponent;
  let fixture: ComponentFixture<GuidanceComponent>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    // Create a mock object for Router
    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [GuidanceComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to root when backBtn is called', () => {
    component.backBtn();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should have correct guidance data', () => {
    expect(component.guidance).toEqual([
      {
        id: '01',
        title: 'Choose a category',
        description:
          'First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.',
      },
      {
        id: '02',
        title: 'GUESS LETTERS',
        description:
          'Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it’s wrong, you lose some health, which empties after eight incorrect guesses.',
      },
      {
        id: '03',
        title: 'Win or lose',
        description:
          'You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.',
      },
    ]);
  });
});
