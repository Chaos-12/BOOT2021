import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/lib/my-core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  private supportedOperations = '+-*/=';
  private precision:number = 15;
  private minPrecision = 5;

  private myResume:string = '';
  private myOutput:string = '';
  public resume:string = '';
  public output:string = '';
  public showConversion:boolean = false;
  public binOutput:string = '';
  public octOutput:string = '';
  public hexOutput:string = '';

  private currentNumber:number = 0;
  private operation:string = '+';
  private nextNumber:string = '';
  private negative:boolean = false;
  private decimal:boolean = false;
  private completed:boolean = false;

  constructor(private out: LoggerService) { 
    this.init();
  }

  private updateResume(value:string):void {
    this.myResume = value;
    this.resume = this.myResume;
  }
  private updateOutput(value:string):void {
    this.myOutput = value;
    this.output = this.myOutput;
    if (Number.isNaN(value) || value.includes('.') || value.includes('-') || value.length > this.Precision){
      this.binOutput = '';
      this.octOutput = '';
      this.hexOutput = '';
    } else {
      this.binOutput = this.convertPosIntTo(value, 2);
      this.octOutput = this.convertPosIntTo(value, 8);
      this.hexOutput = this.convertPosIntTo(value, 16);
    }
  }

  public init():void {
    this.currentNumber = 0;
    this.operation = '+';
    this.completed = false;
    this.resetNextNumber();
    this.updateResume('');
    this.updateOutput(this.NextNumber);
  }

  public resetNextNumber():void {
    this.nextNumber = '';
    this.negative = false;
    this.decimal = false;
  }

  public set CurrentNumber(value:number){
    this.currentNumber = value;
  }

  public get CurrentNumber():number {
    return this.currentNumber;
  }

  public set Operation(value:string){
    if(value.length !== 1 || !this.supportedOperations.includes(value)){
      this.out.error(`operation ${value} is not supported`);
      return;
    }
    this.operation = value;
  }

  public get Operation():string {
    return this.operation;
  }

  public set NextNumber(value:string) {
    if(value === null || Number.isNaN(value)){
      this.out.error(`value ${value} is NaN`);
      return;
    }
    let number = Number.parseFloat(value);
    if(number < 0){
      this.negative = true;
      number *= -1;
    } else {
      this.negative = false;
    }
    this.nextNumber = number.toString();
    if (this.nextNumber.includes('.')){
      this.decimal = true;
    } else {
      this.decimal = false;
    }
  }

  public get NextNumber():string {
    let output = '';
    if (this.negative){
      output = '-';
    }
    if(!this.nextNumber){
      return output.concat('0');
    }
    return output.concat(this.nextNumber);
  }

  public set Precision(value:number){
    if(value === null || value < this.minPrecision){
      this.out.warn(`value ${value} is invalid: treated as ${this.minPrecision}`);
      this.precision = this.minPrecision;
      return;
    }
    this.precision = value;
  }

  public get Precision():number {
    return this.precision;
  }

  private operate():void {
    let number = Number.parseFloat(this.NextNumber);
    switch (this.operation){
      case '+':
        this.add(number);
        break;
      case '-':
        this.substract(number);
        break;
      case '*':
        this.multiply(number);
        break;
      case '/':
        this.divide(number);
        break;
    }
    this.currentNumber = Number.parseFloat(this.currentNumber.toPrecision(this.precision));
    this.resetNextNumber();
  }

  public add(value:number):number {
    return this.currentNumber += value;
  }

  public substract(value:number):number {
    return this.currentNumber -= value;
  }

  public multiply(value:number):number {
    return this.currentNumber *= value;
  }

  public divide(value:number):number {
    return this.currentNumber /= value;
  }

  // The actions for the user
  public pressNumber(value:number):void {
    if(value < 0){
      this.out.error(`value ${value} can't be negative`);
      return;
    }
    if(this.completed){
      this.init();
    }
    if(value === 0 && Number.parseFloat(this.nextNumber) === 0){
      return;
    }
    let digits = this.nextNumber.length;
    if(this.decimal){
      digits --;
      if(this.nextNumber[0] === '0'){
        digits --;
      }
    }
    if (digits < this.precision){
      this.nextNumber += value;
      this.updateOutput(this.NextNumber);
    }
  }

  public pressOperation(value:string):void {
    if(value.length !== 1 || !this.supportedOperations.includes(value)){
      this.out.error(`operation ${value} is not supported`)
    }
    if (this.nextNumber.length){
      this.resume += ' '.concat(this.NextNumber);
      this.operate();
    } else {
      this.resume = this.resume.slice(0,-2);
      if(!this.resume.length){
        this.resume += ' '.concat(this.NextNumber);
      }
    }
    if (this.completed){
      this.resume = this.currentNumber.toString();
    }
    this.operation = value;
    this.resume += ' '.concat(value);
    this.updateResume(this.resume);
    this.updateOutput(this.currentNumber.toString());
    if('=' === value){
      this.completed = true;
    } else {
      this.completed = false;
    }
  }

  public pressDecimal():void {
    if (this.completed){
      this.init();
    }
    if (!this.decimal){
      if (this.nextNumber === ''){
        this.nextNumber = '0';
      }
      this.nextNumber += '.';
      this.decimal = true;
      this.updateOutput(this.NextNumber);
    } else {
      this.out.warn(`The number is already decimal`);
    }
  }

  public changeSign():void {
    this.negative = !this.negative;
    this.updateOutput(this.NextNumber);
  }

  public goBack():void {
    if (this.nextNumber.length){
      this.nextNumber = this.nextNumber.slice(0,-1);
      this.updateOutput(this.NextNumber);
    }
  }

  public convertPosIntTo(value:string, nDigits:number):string {
    if (value === null || Number.isNaN(value)){
      this.out.warn(`string ${value} is NaN`);
      return '';
    }
    if (value.includes('-')){
      this.out.warn(`the input ${value} is negative`);
      return '';
    }
    if (value.includes('.')){
      this.out.warn(`the input ${value} is decimal`);
      return '';
    }
    if (value.length > this.precision){
      this.out.warn(`the input ${value} is too large`);
      return '';
    }
    return Number.parseInt(value).toString(nDigits);
  }

  public pressConversion():void{
    this.showConversion = !this.showConversion;
  }

  ngOnInit(): void {
  }

}
