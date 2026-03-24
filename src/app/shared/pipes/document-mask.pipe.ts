import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documentMask',
  pure: true
})
export class DocumentMaskPipe implements PipeTransform {
  transform(value: string | number): string {
    const raw = (value || '').toString();
    const digits = raw.replace(/\D/g, '').slice(0, 14);
    if (!digits) return '';
    if (digits.length <= 11) {
      const p1 = digits.slice(0, 3);
      const p2 = digits.slice(3, 6);
      const p3 = digits.slice(6, 9);
      const p4 = digits.slice(9, 11);
      let out = p1;
      if (p2) out += '.' + p2;
      if (p3) out += '.' + p3;
      if (p4) out += '-' + p4;
      return out;
    }
    const p1 = digits.slice(0, 2);
    const p2 = digits.slice(2, 5);
    const p3 = digits.slice(5, 8);
    const p4 = digits.slice(8, 12);
    const p5 = digits.slice(12, 14);
    let out = p1;
    if (p2) out += '.' + p2;
    if (p3) out += '.' + p3;
    if (p4) out += '/' + p4;
    if (p5) out += '-' + p5;
    return out;
  }
}
