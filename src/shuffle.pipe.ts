import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "underscore";

@Pipe({
  name: 'shuffle'
})
export class ShufflePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.shuffle(value)
  }

}
