import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "underscore";

@Pipe({
  name: "flatten"
})
export class FlattenPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return _.flatten(value);
  }
}
