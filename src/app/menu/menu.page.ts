import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GenericService } from '../services/generic-service.service';
import { Estudiante } from '../models/Estudiante';
import { Solicitud } from '../models/Solicitud';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  readonly estudianteUrl: string = "estudiante/";
  estudianteMat = localStorage.getItem("matricula");
  estudiante: Estudiante;

  constructor(private genericService: GenericService, private router: Router) { }

  ngOnInit() {
    this.getEstudiante();
  }


  getEstudiante() {
    this.genericService.getByMat(this.estudianteUrl + "bymat/", this.estudianteMat, (estudiante: any) => {
      this.estudiante = estudiante;
    });
  }

  nuevaSolicitud(){
    this.router.navigate(['/main']);
  }

  verPendientes(){
    this.router.navigate(['/ver-solicitudes']);
  }


}
