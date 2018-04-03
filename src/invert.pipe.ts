import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "underscore";

@Pipe({
  name: 'invert'
})
export class InvertPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.invert(value);
  }

}
