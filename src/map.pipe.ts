import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "underscore";
@Pipe({
  name: "map"
})
export class MapPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let re = _.map(value, (item, key) => {
      return { item: item, key: key };
    });
    return re;
  }
}
