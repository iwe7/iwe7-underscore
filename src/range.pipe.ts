import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "underscore";

@Pipe({
  name: "range"
})
export class RangePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return _.range(value, args);
  }
}
