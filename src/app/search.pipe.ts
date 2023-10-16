import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[],searchVal:string): any[] {
    return products.filter((el)=>{
      return el.title.toLowerCase().includes(searchVal.toLowerCase())
    });
  }

}
