import { Component, OnInit } from '@angular/core';

import { Estudiante } from '../models/Estudiante';
import { GenericService } from '../services/generic-service.service';
import { Solicitud } from '../models/Solicitud';

@Component({
  selector: 'app-ver-solicitudes',
  templateUrl: './ver-solicitudes.page.html',
  styleUrls: ['./ver-solicitudes.page.scss'],
})
export class VerSolicitudesPage implements OnInit {

  readonly estudianteUrl: string = "estudiante/";
  readonly estudianteMat: string = localStorage.getItem('matricula');
  
  estudiante: Estudiante;
  solicitudes: Solicitud[];

  constructor(private genericService: GenericService) { }

  ngOnInit() {
    this.getEstudiante();
  }

  getEstudiante() {
    this.genericService.getByMat(this.estudianteUrl + "bymat/", this.estudianteMat, (estudiante: any) => {
      this.estudiante = estudiante;
      this.solicitudes = estudiante.solicitudes;
    });
  }


}
