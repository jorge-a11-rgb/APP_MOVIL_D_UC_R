import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { $ } from 'protractor';

import { createAnimation } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { DBTaskService } from 'src/app/services/dbtask.service';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {
  @ViewChild('titulo', { read: ElementRef, static: true }) titulo: ElementRef;
  @ViewChild('titulo2', { read: ElementRef, static: true }) titulo2: ElementRef;
  field: any;
  public usuario: Usuario;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private activeroute: ActivatedRoute,
    private alertController: AlertController,
    private animationController: AnimationController,
    private dbtaskService: DBTaskService,
    private storage: Storage,
    private authenticationSerive: AuthenticationService
  ) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }
  public ngAfterViewInit(): void {
    // eslint-disable-next-line prefer-const
    let animation = this.animationController
      .create()
      .addElement(this.titulo.nativeElement)
      .addElement(this.titulo2.nativeElement)

      .duration(1500)
      .fromTo('transform', 'translate(0px)', 'translate(100px)')
      .fromTo('opacity', 0.1, 1);

    document.querySelector('#limpiar1').addEventListener('click', () => {
      animation.play();
    });
  }
  public ngOnInit(): void {}

  public ingresar(): void {
    if (!this.validarUsuario(this.usuario)) {
      return;
    }

    this.mostrarMensaje('¡Bienvenido!');

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario.nombreUsuario,
      },
    };
    this.router.navigate(['/home'], navigationExtras);
  }

  public registrar() {
    this.createSesionData(this.usuario);
  }
  /*** Función que genera (registra) una nueva sesión
   * @param login
   */
  public createSesionData(usuario: any) {
    if (this.validateModel(usuario)) {
      const copy = Object.assign({}, usuario);
      copy.Active = 1;
      this.dbtaskService
        .createSesionData(copy)
        .then((data) => {
          this.presentToast('Bienvenido');
          this.storage.set('USER_DATA', data);
          this.router.navigate(['/home']);
        })
        .catch((error1) => {
          this.presentToast('El usuario ya existe');
          console.log(error1);
        });
    } else {
      this.presentToast('Falta: ' + this.field);
    }
  }

  public validateModel(model: any) {
    for (const [key, value] of Object.entries(model)) {
      if (value === '') {
        this.field = key;
        return false;
      }
    }
    return true;
  }
  /*** Muestra un toast al usuario
   * @param message Mensaje a presentar al usuario
   * @param duration Duración el toast, este es opcional
   */
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message,
      duration: duration ? duration : 2000,
    });
    toast.present();
  }

  public ionViewWillEnter() {
    console.log('ionViewDidEnter');
    this.dbtaskService
      .sesionActive()
      .then((data) => {
        if (data !== undefined) {
          this.storage.set('USER_DATA', data);
          this.router.navigate(['home']);
        }
      })
      .catch((error2) => {
        console.error(error2);
        this.router.navigate(['login']);
      });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Creación de Usuario',
      message:
        'Mensaje <strong>El usuario no existe, desea registrarse?</strong>',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
        },
        {
          text: 'SI',
          handler: () => {
            this.createSesionData(this.usuario);
          },
        },
      ],
    });
    await alert.present();
  }

  public validarUsuario(usuario: Usuario): boolean {
    const mensajeError = usuario.validarUsuario();

    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false;
    }

    return true;
  }

  /**
   * Muestra un toast al usuario
   *
   * @param mensaje Mensaje a presentar al usuario
   * @param duracion Duración el toast, este es opcional
   */
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
    });
    toast.present();
  }
  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.usuario)) {
      Object.defineProperty(this.usuario, key, { value: '' });
    }
  }
}
