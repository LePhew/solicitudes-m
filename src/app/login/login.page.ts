import { Component } from '@angular/core';
import { GenericService } from '../services/generic-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  readonly pagename: string = "Sistema de Solicitudes";
  readonly componentUrl: string = "estudiante/";

  cedula: string = "";
  password: string = "";

  constructor(private genericService: GenericService, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    //Luego de la mascara, el string llegaba sin los dashes (-), aqui se los agregamos.
    //this.cedula = `${this.cedula.substr(0,3)}-${this.cedula.substr(3,7)}-${this.cedula.substr(10,1)}`
    if (this.password == "") {
      Swal.fire("Contraseña incorrecta", "Debe introducir una contraseña válida", "warning");
    }
    else {
      var params = {
        cedula: this.cedula,
        contrasena: this.password
      }
      this.genericService.autenticar(this.componentUrl + "autenticar", params, (estudiante) => {
        if (estudiante) {
          localStorage.setItem('matricula', estudiante.matricula);
          localStorage.setItem('cedula', estudiante.cedula);
          localStorage.setItem('nivelId', estudiante.nivel.id);
          localStorage.setItem('institucionId', estudiante.institucion.id);
          this._router.navigate(['/menu']);
        }
        else {
          Swal.fire({
            title: 'Usuario no encontrado',
            text: 'Desea crearlo?',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
          }).then(response => {
            if (response.value) {
              this._router.navigate(['/']);
            }
          })
        }
      })
    }
  }
}
