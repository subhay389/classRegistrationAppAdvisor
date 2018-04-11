import { NgModule }      from '@angular/core';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@NgModule({
  imports:        [],
  declarations:   [],
  exports:        [],
})

@Pipe({
  name: 'keys'
})
// export class FilterPipe implements PipeTransform {
//   transform(items: any[], searchText: string): any[] {
//     if(!items) return [];
//     if(!searchText) return items;
// //searchText = searchText.toLowerCase();
// return items.filter( it => {
//     //return it.toLowerCase().includes(searchText);  
//     return it.includes(searchText);
//     });
//    }

// export class KeysPipe implements PipeTransform {
//   transform(value, args:string[]) : any {
//     let keys = [];
//     for (let key in value) {
//       keys.push({key: key, value: value[key]});
//     }
//     return keys;
//   }
// }

// export class KeysPipe implements PipeTransform {
//   transform(dict: Object) {
//     var a = [];
//     for (var key in dict) {
//       if (dict.hasOwnProperty(key)) {
//         a.push({key: key, val: dict[key]});
//       }
//     }
//     return a;
//   }
// }

export class KeysPipe implements PipeTransform {
  transform(map: { [key: string]: any }, ...parameters: any[]) {
      if (!map)
          return undefined;
      return Object.keys(map)
          .map((key) => ({ 'key': key, 'value': map[key] }));
  }
}