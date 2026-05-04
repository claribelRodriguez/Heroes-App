import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
    service = TestBed.inject(LoadingService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería inicializar loading en false', () => {
    expect(service.loading()).toBe(false);
  });

  it('debería cambiar loading a true al llamar a show()', () => {
    service.show();
    expect(service.loading()).toBe(true);
  });

  it('debería cambiar loading a false al llamar a hide()', () => {
    service.show();
    service.hide();
    expect(service.loading()).toBe(false);
  });
});



