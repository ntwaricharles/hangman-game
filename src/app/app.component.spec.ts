import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'hangman-game'`, () => {
    expect(component.title).toEqual('hangman-game');
  });

  it('should have initial isGameOver as false', () => {
    expect(component.isGameOver).toBeFalsy();
  });

  it('should have initial revealedWord as empty string', () => {
    expect(component.revealedWord).toBe('');
  });

  it('should reset isGameOver and revealedWord on onTryAgain', () => {
    component.isGameOver = true;
    component.revealedWord = 'test';
    component.onTryAgain();
    expect(component.isGameOver).toBeFalsy();
    expect(component.revealedWord).toBe('');
  });
});
