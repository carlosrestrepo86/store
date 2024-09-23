import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string { // Recibe string, no recibe argumentos y retorna un string
    return value.split('').reverse().join('');
  }

}
