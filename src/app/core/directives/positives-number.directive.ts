import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[positivesNumber]'
})
export class PositivesNumberDirective {
    constructor(private el: ElementRef) { }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'];
        if (allowedKeys.includes(event.key)) {
            return;
        }

        const isNumber = /^\d+$/.test(event.key);
        if (!isNumber) {
            event.preventDefault();
        }
    }
}
