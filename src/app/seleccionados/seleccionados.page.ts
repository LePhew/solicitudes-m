import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Documento } from '../models/Documento';

@Component({
  selector: 'app-seleccionados',
  templateUrl: './seleccionados.page.html',
  styleUrls: ['./seleccionados.page.scss'],
})
export class SeleccionadosPage implements OnInit {

  @Input() documentos: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    })
  }

}
