import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';
import { PIPES_CALC } from './pipes/calculator.pipe';
import { SizerComponent } from './components/sizer.component';



@NgModule({
  declarations: [
    PIPES_CADENAS, PIPES_CALC, SizerComponent,
  ],
  exports: [
    PIPES_CADENAS, PIPES_CALC, SizerComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MyCoreModule { }