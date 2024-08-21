import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], exclude: any): any[]{
    if (!items || exclude === undefined) {
      return items;
    }
    return items.filter(item => item.order !== exclude);
  }
  }


