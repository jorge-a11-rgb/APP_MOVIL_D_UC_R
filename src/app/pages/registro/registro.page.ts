/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { toastController } from '@ionic/core';
import { pass } from 'src/app/model/pass';
import { Session } from 'selenium-webdriver';
import { Usuario } from 'src/app/model/Usuario';
import { DBTaskService } from 'src/app/services/dbtask.service';


import { NavigationExtras } from '@angular/router';

import { Usuario_pass2 } from 'src/app/model/Ususario_pass2';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
sesion={
  user_name:'',
  password: '',
  password2: '',
  segundo_apellido_materno: '',
  active: 1
}


  validarUsuario: any;

  toastController: any;
constructor(private router: Router, private activeroute: ActivatedRoute
  , private alertController: AlertController
  , private animationController: AnimationController
  , private DBTaskService: DBTaskService){}


  registrar(){
    if(this.sesion.password!==this.sesion.password2){
      this.mostrarMensaje('Las claves deben ser iguales');
    }
    if(this.sesion.password===null){
      this.mostrarMensaje('Debe ingresar una clave');
    }
    if(this.sesion.password2===null){
      this.mostrarMensaje('Debe ingresar la segunda clave');
    }
    if(this.sesion.user_name.trim()===''){
      this.mostrarMensaje('Debe ingresar usuario para registrarse');

    }
    if(this.sesion.segundo_apellido_materno.trim()===''){
      this.mostrarMensaje('Debe ingresar el segundo apellido de su madre');
    }
    createSesionData(this.sesion);
  }
  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.sesion)) {
      Object.defineProperty(this.sesion, key, { value: '' });
    }
  }
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

}
function createSesionData(sesion: any) {
  throw new Error('Function not implemented.');
}

