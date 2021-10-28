/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { DBTaskService } from 'src/app/services/dbtask.service';

import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit, AfterViewInit {
  @ViewChild('i', { read: ElementRef, static: true }) i: ElementRef;

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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public ngAfterViewInit(): void {
    // eslint-disable-next-line prefer-const
    let animation = this.animationController.create()
      .addElement(this.i.nativeElement)
      .iterations(Infinity)
      .duration(1500)
      .fromTo('opacity', 0.1, 5);
       animation.play();
  }

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
    }else{
      createSesionData(this.sesion);
    }
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

