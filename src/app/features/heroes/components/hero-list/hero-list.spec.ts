import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list';
import { HeroService } from '../../../../core/services/hero.service';
import { SwalService } from '../../../../core/services/swal.service';
import { MatDialog } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroServiceMock: Partial<HeroService>;
  let swalServiceMock: Partial<SwalService>;

  beforeEach(async () => {
    heroServiceMock = {
      heroes: signal([
        { id: 1, name: 'Superman', powerstats: {}, appearance: {}, biography: {}, work: {}, connections: {}, images: {}, slug: 'superman' },
        { id: 2, name: 'Batman', powerstats: {}, appearance: {}, biography: {}, work: {}, connections: {}, images: {}, slug: 'batman' }
      ]),
      searchTerm: signal(''),
      filteredHeroes: signal([]),
      getIsEditing: signal(false),
      getHeroes: vi.fn().mockReturnValue(signal([])),
      deleteHero: vi.fn(),
      startEditing: vi.fn()
    };

    swalServiceMock = {
      confirmDelete: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [MatPaginatorModule, HeroListComponent, NoopAnimationsModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: HeroService, useValue: heroServiceMock },
        { provide: SwalService, useValue: swalServiceMock },
        provideHttpClient(),
        { provide: MatDialog, useValue: { open: vi.fn() } },
        provideRouter([])
      ],
    })
    .overrideComponent(HeroListComponent, {
      set: { templateUrl: '', styleUrls: [] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar deleteHero() con confirmación de SweetAlert', async () => {
    vi.mocked(swalServiceMock.confirmDelete!).mockResolvedValue(true);  
    await component.deleteHero(1);
    expect(vi.mocked(heroServiceMock.deleteHero!)).toHaveBeenCalledWith(1);
  });
  
  it('debería abrir el formulario de creación', () => {
    component.createHero();
    expect(vi.mocked(heroServiceMock.startEditing!)).toHaveBeenCalledWith(null);
  });
});



