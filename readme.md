# 项目背景
> 今天心血来潮，以前不常写东西，接触angular以来，觉得有必要分享一些新的体会了，于是来到了这里。

- 管道Pipe可以将数据作为输入，然后按照规则将其转换并输出。

## 创建项目
```sh
ng new meepo-underscore
cd meepo-underscore
```

## 创建module和初始化pipe
```sh
ng g m meepo-underscore
ng g pipe map
ng g pipe flatten
ng g pipe invert
ng g pipe range
ng g pipe sample
ng g pipe shuffle
ng g pipe values
```

## 分析需求及实现

- map 结构转数组
> meepo-underscore/map.pipe.ts
```ts
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
```
- 使用
```ts
let obj = {
    name: "bob",
    school: "school",
    address: "xueyuan"
}
```
```html
<div *ngFor="let item of obj | map">
    {{item.key}}:{{item.item}}
</div>
```
- flatten 接收一个Array，无论这个Array里面嵌套了多少个Array，flatten()最后都把它们变成一个一维数组
> meepo-underscore/flatten.pipe.ts
```ts
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
```
- 使用
```html
<div *ngFor="let item of [[1],[2],[3,4,5]] | flatten">
    {{item.key}}:{{item.item}}
</div>
```
- invert 把object的每个key-value来个交换，key变成value，value变成key
```ts
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
```
- 使用
```html
<div *ngFor="let item of [{key1:'item1'},{key2:'item2'}] | invert | map">
    {{item.key}}:{{item.item}}
</div>
```
- range 区间数组
```ts
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
```
- 使用
```html
<div *ngFor="let item of 0 | range:10">
    {{item}}
</div>
```
- sample 随机选择一个或多个元素：
```ts
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

```
- 使用
```html
<h2 class="title">_.sample</h2>
<div *ngFor="let item of obj | map | sample:4">
  {{item.item}}
</div>
```
- shuffle 用洗牌算法随机打乱一个集合
```ts
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

```

```html
<h2 class="title">_.shuffle</h2>
<div *ngFor="let item of obj | map | shuffle">
  {{item.key}}-{{item.item}}
</div>
```
- values 对象值遍历

```ts
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "underscore";

@Pipe({
  name: 'values'
})
export class ValuesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.values(value);
  }

}

```


### 发布准备
新建package.json
```json
{
    "name": "meepo-underscore",
    "version": "2.0.2",
    "repository": "https://github.com/meepobrother/meepo-underscore.git",
    "author": "imeepos <1037483576@qq.com>",
    "license": "MIT",
    "private": false,
    "scripts": {
        "git": "git add . && git commit -m 'push to save' && git push origin master"
    },
    "peerDependencies": {
        "@angular/core": "*",
        "@angular/common": "*",
        "rxjs": "*",
        "underscore": "*"
    },
    "ngPackage": {
        "$schema": "./node_modules/ng-packagr/ng-package.schema.json",
        "dest": "../../../meepo/underscore",
        "workingDirectory": "./.ng_build",
        "lib": {
            "entryFile": "./public_api.ts"
        }
    }
}
```
导出模块
```ts
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

```

## 发布到npm

```sh
ng-packagr -p ./src/app/shared/underscore/package.json
```

## 使用安装

```sh
yarn add meepo-underscore
```

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { UnderscoreModule } from 'meepo-underscore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    UnderscoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 总结
本文介绍了 Angular 自定义管道pipe的方法，并发布到npm, 方便使用及管理。

项目地址： https://github.com/meepobrother/meepo-underscore.git