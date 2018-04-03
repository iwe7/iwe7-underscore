import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "underscore";

@Pipe({
  name: "sample"
})
export class SamplePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let item = _.sample(value, args);
    return item;
  }
}
