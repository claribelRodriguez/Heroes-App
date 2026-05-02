import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroCardComponent', () => {
  const mockHero = {
    id: 1,
    name: 'Test Hero',
    images: { md: '' },
    powerstats: { intelligence: 10, strength: 20, speed: 30 },
    appearance: { gender: 'Male', eyeColor: 'Blue', height: ['', '180cm'] },
    biography: { publisher: 'DC', placeOfBirth: 'Earth' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCardComponent, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { hero: mockHero } },
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
      ],
    }).compileComponents();
  });

  it('debería crearse el componente', () => {
    const fixture = TestBed.createComponent(HeroCardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('debería mostrar el nombre del héroe', () => {
    const fixture = TestBed.createComponent(HeroCardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Test Hero');
  });
});
