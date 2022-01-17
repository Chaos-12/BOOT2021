import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name:'multiplicationReplace'
})
export class MultiplicationReplacePipe implements PipeTransform {
  transform(value:string, args?: any):any {
    return value?.replace(/\*/g, '\u00D7');
  }
}

@Pipe({
  name:'divisionReplace'
})
export class DivisionReplacePipe implements PipeTransform {
  transform(value:string, args?: any):any {
    return value?.replace(/\//g, '\u00F7');
  }
}

@Pipe({
  name:'commaReplace'
})
export class CommaReplacePipe implements PipeTransform {
  transform(value:string, args?:any):any {
    return value?.replace(/\./g, '\,');
  }
}

@Pipe({
  name:'spacing'
})
export class SpacingPipe implements PipeTransform {
  transform(value:string, blockLength:number, args?:any):any {
    if (!value.length){
      return '-';
    }
    let nBlocks = Math.ceil(value?.length/blockLength);
    let start = '';
    for (let i=0; i < nBlocks*blockLength - value?.length; i++){
      start = start.concat('0');
    }
    let extendedValue = start.concat(value);
    let array = [];
    for (let i=0; i < nBlocks; i++){
      array.push(extendedValue.slice(i*blockLength, (i+1)*blockLength));
    }
    return array.join(' ');
  }
}

export const PIPES_CALC = [ MultiplicationReplacePipe, DivisionReplacePipe, CommaReplacePipe, SpacingPipe, ];