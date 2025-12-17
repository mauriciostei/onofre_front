import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber',
  standalone: true
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '0';
    }
    
    // Redondear a entero y formatear con separadores de miles
    const roundedValue = Math.round(value);
    return roundedValue.toLocaleString('es-ES');
  }
}

