import { Component, OnInit } from '@angular/core';
import { DemosComponent } from '../demos/demos.component';
import { HomeComponent } from '../main';
import { CalculatorComponent } from '../calculator/calculator.component';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css']
})
export class DinamicoComponent implements OnInit {
  menu = [
    {texto: 'inicio', icono: '', componente: HomeComponent},
    {texto: 'demos', icono: '', componente: DemosComponent},
    {texto: 'calculator', icono: '', componente: CalculatorComponent},
    {texto: 'formulario', icono: '', componente: FormularioComponent},
  ];
  actual: any = this.menu[2].componente;

  constructor() { }

  public seleccionar(indice:number):void {
    this.actual = this.menu[indice].componente;
  }

  ngOnInit(): void {
  }

}
