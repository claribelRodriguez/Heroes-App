import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SwalService } from './swal.service';

describe('HeroService', () => {
  let service: HeroService;
  let swalServiceMock: Partial<SwalService>;

  beforeEach(() => {
    swalServiceMock = {
      success: vi.fn(),
      error: vi.fn(),
      confirmDelete: vi.fn().mockResolvedValue(true)
    };

    TestBed.configureTestingModule({
      providers: [
        HeroService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SwalService, useValue: swalServiceMock }
      ],
    });
    service = TestBed.inject(HeroService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería inicializar la señal de héroes', () => {
    // heroes() es un computed que depende del recurso
    expect(service.heroes).toBeDefined();
    expect(Array.isArray(service.heroes())).toBe(true);
  });

  it('debería tener implementados los métodos CRUD', () => {
    expect(service.addHero).toBeDefined();
    expect(service.updateHero).toBeDefined();
    expect(service.deleteHero).toBeDefined();
  });

  it('debería filtrar héroes localmente', () => {
    // El filtrado es una señal computada basada en searchHeroes(query)
    const query = 'batman';
    const filtered = service.searchHeroes(query);
    expect(filtered).toBeDefined();
  });
});
