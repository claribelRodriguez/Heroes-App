import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list';
import { HeroService } from '../../../../core/services/hero.service';
import { SwalService } from '../../../../core/services/swal.service';
import { MatDialog } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroService: any;
  let swalService: any;

  beforeEach(async () => {
    const heroServiceSpy = {
      getHeroes: vi.fn(),
      fetchHeroes: vi.fn(),
      deleteHero: vi.fn(),
      startEditing: vi.fn()
    };
    const swalServiceSpy = {
      confirmDelete: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatPaginatorModule, HeroListComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: SwalService, useValue: swalServiceSpy },
        provideHttpClient(),
        { provide: MatDialog, useValue: {} },
        provideRouter([])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    swalService = TestBed.inject(SwalService);

    heroService.getHeroes.mockReturnValue(signal([
      { id: 1, name: 'Superman', powerstats: {}, appearance: {}, biography: {}, work: {}, connections: {}, images: {}, slug: 'superman' },
      { id: 2, name: 'Batman', powerstats: {}, appearance: {}, biography: {}, work: {}, connections: {}, images: {}, slug: 'batman' }
    ]));
    component.heroes = heroService.getHeroes();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a fetchHeroes si no hay héroes en memoria', () => {
    heroService.getHeroes.mockReturnValue(signal([]));
    component.heroes = signal([]);
    fixture.detectChanges();
    expect(heroService.fetchHeroes).toHaveBeenCalled();
  });
  
  it('debería ejecutar deleteHero() con confirmación de SweetAlert', async () => {
    swalService.confirmDelete.mockResolvedValue(true);  
    await component.deleteHero(1);
    expect(heroService.deleteHero).toHaveBeenCalledWith(1);
  });  
});
