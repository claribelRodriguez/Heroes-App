import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { SwalService } from './swal.service';
import { Hero } from '../models/heroe.model';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;
  let swalServiceMock: Partial<SwalService>;

  const mockHero: Hero = { 
    id: 1, 
    name: 'Superman', 
    powerstats: {}, 
    appearance: {}, 
    biography: { aliases: [] }, 
    work: {}, 
    connections: {}, 
    images: {}, 
    slug: 'superman' 
  };

  beforeEach(() => {
    vi.mock('sweetalert2', () => ({
      default: {
        fire: vi.fn().mockResolvedValue({ isConfirmed: true }),
      }
    }));
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
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería agregar un héroe si no existe', () => {
    vi.spyOn(service, 'heroes').mockReturnValue([]);
    service.addHero(mockHero);
    const req = httpMock.expectOne('http://localhost:3000/heroes');
    expect(req.request.method).toBe('POST');
    req.flush(mockHero);
    expect(swalServiceMock.success).toHaveBeenCalled();
  });

  it('no debería agregar un héroe si el nombre ya existe', () => {
    vi.spyOn(service, 'heroes').mockReturnValue([mockHero]);
    service.addHero(mockHero);
    expect(swalServiceMock.error).toHaveBeenCalledWith(`El héroe "${mockHero.name}" ya existe en la base de datos.`);
  });

  it('debería actualizar un héroe', () => {
    service.updateHero(mockHero);
    const req = httpMock.expectOne(`http://localhost:3000/heroes/${mockHero.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockHero);
    expect(swalServiceMock.success).toHaveBeenCalled();
  });

  it('debería eliminar un héroe', () => {
    service.deleteHero(mockHero.id);
    const req = httpMock.expectOne(`http://localhost:3000/heroes/${mockHero.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    expect(swalServiceMock.success).toHaveBeenCalled();
  });
});



