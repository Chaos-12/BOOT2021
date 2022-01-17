import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';
import { PIPES_CALC } from './pipes/calculator.pipe';
import { SizerComponent } from './components/sizer.component';
import { MIS_VALIDADORES } from './directives/validadores.directive';



@NgModule({
  declarations: [
    PIPES_CADENAS, PIPES_CALC, MIS_VALIDADORES, SizerComponent,
  ],
  exports: [
    PIPES_CADENAS, PIPES_CALC, MIS_VALIDADORES, SizerComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MyCoreModule { }