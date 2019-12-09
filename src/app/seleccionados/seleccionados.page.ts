import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { GenericService } from '../services/generic-service.service';
import { Documento } from '../models/Documento';
import { SolicitudDTO } from '../models/Solicitud';
import { Estudiante } from '../models/Estudiante';

@Component({
  selector: 'app-seleccionados',
  templateUrl: './seleccionados.page.html',
  styleUrls: ['./seleccionados.page.scss'],
})
export class SeleccionadosPage implements OnInit {

  @Input() documentos: any[];
  readonly estudianteUrl: string = "estudiante/";
  readonly componentUrl: string = "solicitud/";

  matricula: string = localStorage.getItem('matricula');
  estudiante: Estudiante;

  constructor(public modalController: ModalController, private genericService: GenericService, private router: Router) { }

  ngOnInit() {
    this.getEstudiante();
  }

  getEstudiante(){
    this.genericService.getByMat(this.estudianteUrl+"bymat/", this.matricula, (estudiante: any) => {
      this.estudiante = estudiante;
    });
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    })
  }

  remover(documentoId: string){
    let index = this.documentos.indexOf(documentoId);
    this.documentos.splice(index, 1);
  }

  enviarSolicitud(){
    let documentosIdx: any[];
      for(let i = 0; i > this.documentos.length; ++i){
        documentosIdx.push(this.documentos[i].id)
      }

    if(this.documentos.length > 0){
        let solicitud = new SolicitudDTO(this.estudiante.id, documentosIdx);
        this.genericService.crear(this.componentUrl, solicitud, () => {
          this.documentos = [];
          //this.dismiss();
          this.router.navigate(['/menu']);
        })
      }
      else{
        Swal.fire("Error", "No se puede enviar una solicitud vacia, por favor seleccione los documentos que desea solicitar", "error");
      }
    }

}