import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value : any[], filterString: string, propName:string): any[] {

    //     transform() method is called every time the pipe is used and it takes 3 par:
    // value is the input array that needs to be filtered.
    // filterString is the search string used to filter the array.
    // propName is the property name of each object in the array that needs to be searched for the given search string.
        const result:any =[];
        if(!value || filterString==='' || propName ===''){
          return value;
        }
        value.forEach((a:any)=>{
          if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
            result.push(a);
          }
        });
        return result;
      }
    
    }