import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SwalService } from './swal.service';
import Swal from 'sweetalert2';

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn().mockResolvedValue({ isConfirmed: true, value: true }),
  },
  fire: vi.fn().mockResolvedValue({ isConfirmed: true, value: true }),
}));

describe('SwalService', () => {
  let service: SwalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwalService]
    });
    service = TestBed.inject(SwalService);
    vi.clearAllMocks();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería llamar a Swal.fire para éxito', () => {
    service.success('Test Message');
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('debería llamar a Swal.fire para error', () => {
    service.error('Test Error');
    expect(Swal.fire).toHaveBeenCalled();
  });

  it('debería llamar a Swal.fire para confirmación', async () => {
    const result = await service.confirmDelete();
    expect(result).toBe(true);
    expect(Swal.fire).toHaveBeenCalled();
  });
});
