import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {

  transform(value: any, args:any): unknown {
    let newvalue=value.split('@');
    return newvalue[0];
  }

}
