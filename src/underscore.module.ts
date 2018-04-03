import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapPipe } from "./map.pipe";
import { ShufflePipe } from "./shuffle.pipe";
import { SamplePipe } from "./sample.pipe";
import { RangePipe } from "./range.pipe";
import { FlattenPipe } from "./flatten.pipe";
import { ValuesPipe } from "./values.pipe";
import { InvertPipe } from "./invert.pipe";

export const PIPES = [
  MapPipe,
  ShufflePipe,
  SamplePipe,
  RangePipe,
  FlattenPipe,
  ValuesPipe,
  InvertPipe
];

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES],
  exports: [...PIPES]
})
export class UnderscoreModule {}
