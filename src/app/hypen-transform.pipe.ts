import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hypenTransform'
})
export class HypenTransformPipe implements PipeTransform {

  transform(value: any, format?: string): any {
    let newValue = value;
    if(format === 'remove') {
      newValue = value.replace('-',' ');
    } else {
      newValue = value.toLowerCase().replace(' ','-');
    }

    return newValue;
  }

}
