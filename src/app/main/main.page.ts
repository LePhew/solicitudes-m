import { Component, OnInit } from '@angular/core';
import { GenericService } from '../services/generic-service.service';
import { ModalController } from '@ionic/angular';
import Swal from 'sweetalert2';

import { Estudiante } from '../models/Estudiante';
import { SolicitudDTO } from '../models/Solicitud';
import { SeleccionadosPage } from  '../seleccionados/seleccionados.page';

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
      this.getEstudiante();
      this.getDocumentos();
      
  }


  getEstudiante(){
    this.genericService.getByMat(this.estudianteUrl+"bymat/", this.matricula, (estudiante) => {
      this.estudiante = estudiante;
      this.editMode = false;
    });
  }

  getDocumentos(){
    let data = {
      institucionId: localStorage.getItem('institucionId'),
      nivelId: localStorage.getItem('nivelId')
    }
    this.genericService.getEstudianteDocs(this.documentoUrl+"withparam/estudiante",data, (documentos) => {
      if(documentos.length < 1){
        this.documentos = null;
      }
      else{
        this.documentos = documentos;
      }
    });
  }

  async showSeleccionados(){
    const documentos: any[] = this.documentosSeleccionados
    
    const modal = await this.modalController.create({
      component: SeleccionadosPage,
      componentProps: { documentos }
    });
    return await modal.present();
  }
  
  getSolicitudes(){
    this.genericService.getAll(this.componentUrl, (solicitudes) => {
      this.solicitudes = solicitudes;
    })
  }

  agregarASolicitud(documento: any){
    this.documentosSeleccionados.push(documento);
    console.log(this.documentosSeleccionados);
  }

  removerDocumento(documento:any){
    let index = this.documentosSeleccionados.indexOf(documento);
    this.documentosSeleccionados.splice(index, 1);
  }

  enviarSolicitud(estudianteId: string, documentosSeleccionados: any){
    let documentosIdx: any[];
      this.documentos.forEach(documento => {
        documentosIdx.push(documento.id);
      })

    if(documentosSeleccionados.length > 0){
        let solicitud = new SolicitudDTO(estudianteId, documentosIdx);
        this.genericService.crear(this.componentUrl, solicitud, () => {
          this.documentosSeleccionados = [];
        })
      }
      else{
        Swal.fire("Error", "No se puede enviar una solicitud vacia, por favor seleccione los documentos que desea solicitar", "error");
      }
    }

}
