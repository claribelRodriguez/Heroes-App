import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesPageComponent } from './heroes-page';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';


describe('HeroesPageComponent', () => {
  let component: HeroesPageComponent;
  let fixture: ComponentFixture<HeroesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesPageComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),  
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

