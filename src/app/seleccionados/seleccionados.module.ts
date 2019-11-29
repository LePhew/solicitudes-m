import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionadosPage } from './seleccionados.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [SeleccionadosPage],
  entryComponents: [SeleccionadosPage]
})
export class SeleccionadosPageModule {}
