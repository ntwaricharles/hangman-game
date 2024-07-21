import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesService } from '../../services/categories.service';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let mockCategoriesService: jest.Mocked<CategoriesService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    // Create a mock object for CategoriesService
    mockCategoriesService = {
      getCategories: jest.fn(),
    } as unknown as jest.Mocked<CategoriesService>;

    // Create a mock object for Router
    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;

    // Set up the mock return value for getCategories
    mockCategoriesService.getCategories.mockReturnValue({
      Movies: [{ name: 'Inception', selected: false }],
      'TV Shows': [{ name: 'Breaking Bad', selected: false }],
      Countries: [{ name: 'France', selected: false }],
      'Capital Cities': [{ name: 'Paris', selected: false }],
      Animals: [{ name: 'Lion', selected: false }],
      Sports: [{ name: 'Soccer', selected: false }],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', () => {
    component.ngOnInit();
    expect(component.categories).toEqual({
      Movies: [{ name: 'Inception', selected: false }],
      'TV Shows': [{ name: 'Breaking Bad', selected: false }],
      Countries: [{ name: 'France', selected: false }],
      'Capital Cities': [{ name: 'Paris', selected: false }],
      Animals: [{ name: 'Lion', selected: false }],
      Sports: [{ name: 'Soccer', selected: false }],
    });
    expect(component.keys).toEqual([
      'Movies',
      'TV Shows',
      'Countries',
      'Capital Cities',
      'Animals',
      'Sports',
    ]);
    expect(component.paramKeys).toEqual([
      'Movies',
      'TV_Shows',
      'Countries',
      'Capital_Cities',
      'Animals',
      'Sports',
    ]);
  });

  it('should navigate to home when goHome is called', () => {
    component.goHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
