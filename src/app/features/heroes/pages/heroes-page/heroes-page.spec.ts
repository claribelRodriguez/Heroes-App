import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HeroesPageComponent } from './heroes-page';
import { HeroService } from '../../../../core/services/hero.service';
import { signal, provideZonelessChangeDetection, Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

// Creamos un Mock minimalista del componente para testear su lógica sin cargar HTML/CSS
@Component({
  selector: 'app-heroes-page-mock',
  standalone: true,
  template: '<div>Mock</div>'
})
class HeroesPageMock extends HeroesPageComponent {}

describe('HeroesPageComponent', () => {
  let heroServiceMock: Partial<HeroService>;

  beforeEach(async () => {
    heroServiceMock = {
      getIsEditing: signal(false),
      getEditingHero: signal(null),
      getHeroes: vi.fn().mockReturnValue(signal([])),
      heroes: signal([]),
      isLoading: signal(false),
      error: signal(null)
    } as any;

    await TestBed.configureTestingModule({
      imports: [HeroesPageMock, NoopAnimationsModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: HeroService, useValue: heroServiceMock },
        provideHttpClient(),
        provideRouter([])
      ],
    }).compileComponents();
  });

  it('debería crearse el componente', () => {
    const fixture = TestBed.createComponent(HeroesPageMock);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
