import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { SeleccionadosPageModule } from '../seleccionados/seleccionados.module';
import { SeleccionadosPage } from '../seleccionados/seleccionados.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SeleccionadosPageModule
  ],
  declarations: [
  MainPage
]
})
export class MainPageModule {}
