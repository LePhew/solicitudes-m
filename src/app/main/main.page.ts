import { Component, OnInit } from '@angular/core';
import { GenericService } from '../services/generic-service.service';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';

import { Estudiante } from '../models/Estudiante';
import { SolicitudDTO } from '../models/Solicitud';
import { SeleccionadosPage } from '../seleccionados/seleccionados.page';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  readonly pagename: string = "Nueva solicitud"
  readonly componentUrl: string = "solicitud/";
  readonly estudianteUrl: string = "estudiante/";
  readonly documentoUrl: string = "documento/";

  matricula: string = localStorage.getItem('matricula');
  documentos: any;
  estudiante: Estudiante;
  solicitudes: any;
  editMode: boolean = false;
  documentosSeleccionados: Array<any> = [];

  constructor(private genericService: GenericService, public modalController: ModalController) {

  }

  ngOnInit() {
    this.documentosSeleccionados = [];
    this.getEstudiante();
    this.getDocumentos();

  }


  getEstudiante() {
    this.genericService.getByMat(this.estudianteUrl + "bymat/", this.matricula,
      (estudiante) => {
        this.estudiante = estudiante;
        this.editMode = false;
      });
  }

  getDocumentos() {
    let data = {
      institucionId: localStorage.getItem('institucionId'),
      nivelId: localStorage.getItem('nivelId')
    }
    this.genericService.getEstudianteDocs(this.documentoUrl + "withparam/estudiante", data,
      (documentos) => {
        if (documentos.length < 1) {
          this.documentos = null;
        }
        else {
          this.documentos = documentos;
        }
      });
  }

  async showSeleccionados() {
    const documentos: any[] = this.documentosSeleccionados

    const modal = await this.modalController.create({
      component: SeleccionadosPage,
      componentProps: { documentos }
    });
    return await modal.present();
  }

  getSolicitudes() {
    this.genericService.getAll(this.componentUrl,
      (solicitudes) => {
        this.solicitudes = solicitudes;
      })
  }

  agregarASolicitud(documento: any) {
    this.documentosSeleccionados.push(documento);
    console.log(this.documentosSeleccionados);
  }

}
