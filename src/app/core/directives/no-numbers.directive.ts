import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoNumbers]'
})
export class NoNumbersDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    input.value = value.replace(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
  }
}