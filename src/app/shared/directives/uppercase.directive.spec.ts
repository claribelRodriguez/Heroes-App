import { describe, it, expect, vi } from 'vitest';
import { ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {
  it('debería transformar el valor a mayúsculas en el evento input', () => {
    const input = document.createElement('input');
    input.value = 'test';
    const mockElementRef = { nativeElement: input } as ElementRef;
    
    const mockNgControl = {
      control: {
        setValue: vi.fn(),
        patchValue: vi.fn()
      }
    } as any;

    const directive = new UppercaseDirective(mockElementRef, mockNgControl);
    
    directive.onInput();

    expect(input.value).toBe('TEST');
    expect(mockNgControl.control.setValue).toHaveBeenCalledWith('TEST', { emitEvent: false });
  });

  it('debería crearse la instancia', () => {
    const mockElementRef = { nativeElement: document.createElement('input') } as ElementRef;
    const directive = new UppercaseDirective(mockElementRef, null as any);
    expect(directive).toBeTruthy();
  });
});
