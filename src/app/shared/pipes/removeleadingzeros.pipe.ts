import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeLeadingZeros'
})
export class RemoveLeadingZerosPipe implements PipeTransform {
  transform(value: string): number {
    // Eliminar los caracteres no numéricos al principio del string
    const trimmedValue = value.replace(/^[a-zA-Z]+/, '');
    
    // Eliminar los ceros al principio del string
    const noLeadingZeros = trimmedValue.replace(/^0+/, '');

    // Convertir el string resultante a un número
    return +noLeadingZeros;
  }
}
