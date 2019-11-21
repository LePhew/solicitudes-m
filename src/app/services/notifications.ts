import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';



@Injectable({
    providedIn: 'root'
  })
export class NotificationService {

    constructor(
        private push: Push
    ){}

    async checkForPermissions(){
        return this.push.hasPermission()
            .then(response => {
                if(response.isEnabled){
                    console.log('Permisos existentes.');
                }
                else{
                    console.log('No hay permisos');
                }
            })
    }

    async createChannel(id: string, description: string, importance: any){
       return await this.push.createChannel({
            id: id,
            description: description,
            importance: importance
        });
    }

    async deleteChannel(id: string){
        return await this.push.deleteChannel(id);
    }


}