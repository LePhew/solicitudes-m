import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { GenericService } from '../services/generic-service.service';
import { Estudiante } from '../models/Estudiante';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  readonly estudianteUrl: string = "estudiante/";
  estudiante: Estudiante;
  estudianteMat = localStorage.getItem("matricula");

  constructor(private genericService: GenericService, private menu: MenuController) { }

  ngOnInit() {
    this.getEstudiante();
  }


  getEstudiante() {
    this.genericService.getByMat(this.estudianteUrl + "bymat/", this.estudianteMat, (estudiante: any) => {
      console.log(estudiante);
      this.estudiante = estudiante;
    });
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}
